/**
 * Workshop Analytics Tracking System
 * Collects user interaction data to improve workshop experience
 */

class WorkshopAnalytics {
    constructor(config = {}) {
        this.config = {
            endpoint: config.endpoint || '/api/analytics',
            userId: config.userId || this.generateUserId(),
            sessionId: this.generateSessionId(),
            batchSize: config.batchSize || 10,
            flushInterval: config.flushInterval || 30000, // 30 seconds
            enabled: config.enabled !== false,
            debug: config.debug || false
        };
        
        this.eventQueue = [];
        this.sessionData = {
            startTime: Date.now(),
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            referrer: document.referrer
        };
        
        if (this.config.enabled) {
            this.init();
        }
    }
    
    init() {
        this.startSession();
        this.setupEventListeners();
        this.startPeriodicFlush();
        
        if (this.config.debug) {
            console.log('Workshop Analytics initialized', this.config);
        }
    }
    
    generateUserId() {
        // Generate or retrieve persistent user ID
        let userId = localStorage.getItem('workshop_user_id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('workshop_user_id', userId);
        }
        return userId;
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }
    
    startSession() {
        this.track('session_start', {
            ...this.sessionData,
            module: this.getCurrentModule(),
            learningPath: this.getLearningPath()
        });
    }
    
    setupEventListeners() {
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.track('page_hidden', { timestamp: Date.now() });
            } else {
                this.track('page_visible', { timestamp: Date.now() });
            }
        });
        
        // Track scroll behavior
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.track('scroll_position', {
                    scrollY: window.scrollY,
                    scrollPercent: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
                    timestamp: Date.now()
                });
            }, 1000);
        });
        
        // Track clicks on important elements
        document.addEventListener('click', (event) => {
            const target = event.target;
            
            // Track navigation clicks
            if (target.matches('a[href*="module"]')) {
                this.track('navigation_click', {
                    from: this.getCurrentModule(),
                    to: this.extractModuleFromUrl(target.href),
                    linkText: target.textContent.trim()
                });
            }
            
            // Track checkbox interactions (self-assessment)
            if (target.type === 'checkbox' && target.closest('.self-assessment, .checklist')) {
                this.track('checkbox_interaction', {
                    module: this.getCurrentModule(),
                    checkboxType: target.closest('.self-assessment') ? 'self_assessment' : 'checklist',
                    checked: target.checked,
                    label: this.getCheckboxLabel(target)
                });
            }
            
            // Track external link clicks
            if (target.matches('a[href^="http"]') && !target.href.includes(window.location.hostname)) {
                this.track('external_link_click', {
                    url: target.href,
                    text: target.textContent.trim(),
                    module: this.getCurrentModule()
                });
            }
        });
        
        // Track form submissions (feedback forms)
        document.addEventListener('submit', (event) => {
            if (event.target.matches('.feedback-form, .assessment-form')) {
                this.trackFormSubmission(event.target);
            }
        });
        
        // Track time spent on sections
        this.setupSectionTimeTracking();
    }
    
    setupSectionTimeTracking() {
        const sections = document.querySelectorAll('h2, h3');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionTitle = entry.target.textContent.trim();
                    this.track('section_view', {
                        module: this.getCurrentModule(),
                        section: sectionTitle,
                        timestamp: Date.now()
                    });
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    // Public tracking methods
    trackModuleStart(moduleName) {
        this.track('module_start', {
            module: moduleName,
            timestamp: Date.now(),
            learningPath: this.getLearningPath()
        });
    }
    
    trackModuleComplete(moduleName, timeSpent) {
        this.track('module_complete', {
            module: moduleName,
            timeSpent: timeSpent,
            timestamp: Date.now(),
            completionRate: this.calculateCompletionRate(moduleName)
        });
    }
    
    trackExerciseStart(exerciseName) {
        this.track('exercise_start', {
            module: this.getCurrentModule(),
            exercise: exerciseName,
            timestamp: Date.now()
        });
    }
    
    trackExerciseComplete(exerciseName, success, timeSpent, errors = []) {
        this.track('exercise_complete', {
            module: this.getCurrentModule(),
            exercise: exerciseName,
            success: success,
            timeSpent: timeSpent,
            errors: errors,
            timestamp: Date.now()
        });
    }
    
    trackSelfAssessment(assessmentData) {
        this.track('self_assessment', {
            module: this.getCurrentModule(),
            ...assessmentData,
            timestamp: Date.now()
        });
    }
    
    trackFeedback(feedbackData) {
        this.track('feedback_submission', {
            module: this.getCurrentModule(),
            ...feedbackData,
            timestamp: Date.now()
        });
    }
    
    trackError(errorType, errorDetails) {
        this.track('error_encountered', {
            module: this.getCurrentModule(),
            errorType: errorType,
            errorDetails: errorDetails,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
        });
    }
    
    trackHelpAccess(helpSection) {
        this.track('help_accessed', {
            module: this.getCurrentModule(),
            helpSection: helpSection,
            timestamp: Date.now()
        });
    }
    
    // Core tracking method
    track(eventName, eventData = {}) {
        if (!this.config.enabled) return;
        
        const event = {
            eventName,
            eventData: {
                ...eventData,
                userId: this.config.userId,
                sessionId: this.config.sessionId,
                timestamp: eventData.timestamp || Date.now(),
                url: window.location.href,
                module: eventData.module || this.getCurrentModule()
            }
        };
        
        this.eventQueue.push(event);
        
        if (this.config.debug) {
            console.log('Analytics Event:', event);
        }
        
        if (this.eventQueue.length >= this.config.batchSize) {
            this.flush();
        }
    }
    
    // Helper methods
    getCurrentModule() {
        const path = window.location.pathname;
        const moduleMatch = path.match(/modules\/(\d+)-([^\/]+)/);
        return moduleMatch ? `${moduleMatch[1]}-${moduleMatch[2]}` : 'unknown';
    }
    
    extractModuleFromUrl(url) {
        const moduleMatch = url.match(/modules\/(\d+)-([^\/]+)/);
        return moduleMatch ? `${moduleMatch[1]}-${moduleMatch[2]}` : 'unknown';
    }
    
    getLearningPath() {
        return localStorage.getItem('learning_path') || 'unknown';
    }
    
    getCheckboxLabel(checkbox) {
        const label = checkbox.closest('li') || checkbox.parentElement;
        return label ? label.textContent.trim().substring(0, 100) : 'unknown';
    }
    
    calculateCompletionRate(moduleName) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const checked = document.querySelectorAll('input[type="checkbox"]:checked');
        return checkboxes.length > 0 ? (checked.length / checkboxes.length) * 100 : 0;
    }
    
    trackFormSubmission(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        this.track('form_submission', {
            formType: form.className,
            formData: data
        });
    }
    
    // Data transmission
    flush() {
        if (this.eventQueue.length === 0) return;
        
        const events = [...this.eventQueue];
        this.eventQueue = [];
        
        if (navigator.sendBeacon) {
            // Use sendBeacon for reliable delivery
            navigator.sendBeacon(
                this.config.endpoint,
                JSON.stringify({ events })
            );
        } else {
            // Fallback to fetch
            fetch(this.config.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ events })
            }).catch(error => {
                if (this.config.debug) {
                    console.error('Analytics flush failed:', error);
                }
                // Re-queue events on failure
                this.eventQueue.unshift(...events);
            });
        }
    }
    
    startPeriodicFlush() {
        setInterval(() => {
            this.flush();
        }, this.config.flushInterval);
        
        // Flush on page unload
        window.addEventListener('beforeunload', () => {
            this.flush();
        });
    }
    
    // Public API for manual tracking
    setLearningPath(path) {
        localStorage.setItem('learning_path', path);
        this.track('learning_path_set', { learningPath: path });
    }
    
    setUserProperty(key, value) {
        this.track('user_property_set', { [key]: value });
    }
    
    // Privacy controls
    optOut() {
        this.config.enabled = false;
        localStorage.setItem('analytics_opt_out', 'true');
        this.track('analytics_opt_out');
        this.flush();
    }
    
    optIn() {
        this.config.enabled = true;
        localStorage.removeItem('analytics_opt_out');
        this.track('analytics_opt_in');
    }
    
    isOptedOut() {
        return localStorage.getItem('analytics_opt_out') === 'true';
    }
}

// Auto-initialize if not opted out
if (typeof window !== 'undefined' && !localStorage.getItem('analytics_opt_out')) {
    window.workshopAnalytics = new WorkshopAnalytics({
        debug: window.location.hostname === 'localhost'
    });
    
    // Expose tracking methods globally for easy use
    window.trackModuleStart = (module) => window.workshopAnalytics.trackModuleStart(module);
    window.trackModuleComplete = (module, time) => window.workshopAnalytics.trackModuleComplete(module, time);
    window.trackExerciseStart = (exercise) => window.workshopAnalytics.trackExerciseStart(exercise);
    window.trackExerciseComplete = (exercise, success, time, errors) => 
        window.workshopAnalytics.trackExerciseComplete(exercise, success, time, errors);
    window.trackSelfAssessment = (data) => window.workshopAnalytics.trackSelfAssessment(data);
    window.trackFeedback = (data) => window.workshopAnalytics.trackFeedback(data);
    window.trackError = (type, details) => window.workshopAnalytics.trackError(type, details);
    window.trackHelpAccess = (section) => window.workshopAnalytics.trackHelpAccess(section);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkshopAnalytics;
}