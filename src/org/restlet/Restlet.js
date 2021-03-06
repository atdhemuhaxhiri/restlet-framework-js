var Restlet = new [class Class]({
	initialize: function(context) {
        this.context = context;
        this.started = false;
        //this.name = this.toString();
        this.description = null;
        this.author = null;
        this.owner = null;

        if (Engine.getInstance() == null) {
            /*Context.getCurrentLogger()
                    .severe("Unable to fully initialize the Restlet. No Restlet engine available.");*/
            throw new Error(
                    "Unable to fully initialize the Restlet. No Restlet engine available.");
        }

        Restlet.fireContextChanged(this, context);
        // [enddef]
    },

    finalize: function() {
        if (this.isStarted()) {
        	this.stop();
        }
    },

    getApplication: function() {
        return this.application;
    },

    setApplication: function(application) {
        this.application = application;
    },

    getAuthor: function() {
        return this.author;
    },

    getContext: function() {
        return this.context;
    },

    getDescription: function() {
        return this.description;
    },
    
    getLogger: function() {
        var result = null;
        var context = this.getContext();

        /*if (context == null) {
            context = Context.getCurrent();
        }*/

        if (context != null) {
            result = context.getLogger();
        }

        if (result == null) {
            result = [class Engine].getLogger(this, "org.restlet");
        }

        return result;
    },

    getName: function() {
        return this.name;
    },

    getOwner: function() {
        return this.owner;
    },

    setAuthor: function(author) {
        this.author = author;
    },

    setContext: function(context) {
        this.context = context;
        Restlet.fireContextChanged(this, context);
    },

    setDescription: function(description) {
        this.description = description;
    },

    setName: function(name) {
        this.name = name;
    },

    setOwner: function(owner) {
        this.owner = owner;
    },
    
    /*setProtocols: function(protocols) {
		this.protocols = protocols;
	},*/

	isStarted: function() {
        return this.started;
    },

    isStopped: function() {
        return !this.started;
    },

    start: function() {
        this.started = true;
    },

    stop: function() {
        this.started = false;
    },

    handle: function(request, response) {
    	if (response==null) {
    		response = new [class Response](request);
    	}
    	
        if (this.isStopped()) {
            try {
                this.start();
            } catch (err) {
                // Occurred while starting the Restlet
                this.getContext().getLogger().log([class Level].WARNING, Restlet.UNABLE_TO_START, e);
                response.setStatus([class Status].SERVER_ERROR_INTERNAL);
            }

            if (!this.isStarted()) {
                // No exception raised but the Restlet somehow couldn't be
                // started
                this.getContext().getLogger().log([class Level].WARNING, Restlet.UNABLE_TO_START);
                response.setStatus([class Status].SERVER_ERROR_INTERNAL);
            }
        }
    },

    createFinder: function(resourceClass) {
        var result = null;

        if (this.getFinderClass() != null) {
            result = [class Finder].createFinder(resourceClass,
                    this.getFinderClass(), this.getContext(), this.getLogger());
        } else if ((this.getApplication() != null) && (this.getApplication() != this)) {
            result = this.getApplication().createFinder(resourceClass);
        } else {
            result = [class Finder].createFinder(resourceClass,
                    [class Finder], this.getContext(),
                    this.getLogger());
        }

        return result;
    },

    getFinderClass: function() {
        return this.finderClass;
    },

    setFinderClass: function(finderClass) {
        this.finderClass = finderClass;
    }
});

Restlet.extend({
	/** Error message. */
	UNABLE_TO_START: "Unable to start the Restlet",

	fireContextChanged: function(restlet, context) {
		if (context != null) {
			/*if (context instanceof [class ChildContext]) {
				var childContext = context;

				if (childContext.getChild() == null) {
					childContext.setChild(restlet);
				}
			} else if (!(restlet instanceof [class Component])
					&& (context instanceof [class ComponentContext])) {
				//context.getLogger()
                //    .severe("For security reasons, don't pass the component context to child Restlets anymore. Use the Context#createChildContext() method instead. "
                //            + restlet.getClass());
			}*/
		}
	},
	
	create: function(fn) {
		var restlet = new Restlet();
		restlet.handle = fn;
		return restlet;
	}
});