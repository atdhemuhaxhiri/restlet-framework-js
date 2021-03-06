var Application = new [class Class]([class Restlet], {
	className: "application",
    initialize: function(context) {
        this.callSuperCstr(context);

        if ([class Engine].getInstance() != null) {
            this.helper = new [class ApplicationHelper](this);
            this.helper.setContext(context);
        }

        this.outboundRoot = null;
        this.inboundRoot = null;
        this.roles = [];
        this.services = new [class ServiceList](context);
        /*this.services.add(new TunnelService(true, true));*/
        this.services.add(new [class StatusService]());
        /*this.services.add(new DecoderService());
        this.services.add(new EncoderService(false));
        this.services.add(new RangeService());*/
        //this.services.add(new [class ConnectorService]());
        /*this.services.add(new ConnegService());
        this.services.add(new ConverterService());
        this.services.add(new MetadataService());*/
    },

    createInboundRoot: function() {
        return null;
    },

    createOutboundRoot: function() {
        return this.getHelper().getFirstOutboundFilter();
    },

    getConnectorService: function() {
        return this.getServices().get([class ConnectorService]);
    },

    getConnegService: function() {
        return this.getServices().get([class ConnegService]);
    },

    getConverterService: function() {
        return this.getServices().get([class ConverterService]);
    },

    getDecoderService: function() {
        return this.getServices().get([class DecoderService]);
    },

    getEncoderService: function() {
        return this.getServices().get([class EncoderService]);
    },

    getHelper: function() {
        return this.helper;
    },

    getInboundRoot: function() {
        if (this.inboundRoot == null) {
            this.inboundRoot = this.createInboundRoot();
            if (this.inboundRoot!=null) {
            	this.inboundRoot.setApplication(this);
            }
        }

        return this.inboundRoot;
    },

    getMetadataService: function() {
        return this.getServices().get([class MetadataService]);
    },

    getOutboundRoot: function() {
        if (this.outboundRoot == null) {
            this.outboundRoot = this.createOutboundRoot();
            if (this.outboundRoot!=null) {
            	this.outboundRoot.setApplication(this);
            }
        }

        return this.outboundRoot;
    },

    getRangeService: function() {
        return this.getServices().get([class RangeService]);
    },

    getRole: function(name) {
        for (var i=0; i<this.getRoles().length; i++) {
        	var role = this.getRoles()[i];
            if (role.getName().equals(name)) {
                return role;
            }
        }

        return null;
    },

    getRoles: function() {
        return this.roles;
    },

    getServices: function() {
        return this.services;
    },

    getStatusService: function() {
        return this.getServices().get([class StatusService]);
    },

    getTunnelService: function() {
        return this.getServices().get([class TunnelService]);
    },

    handle: function(request, response) {
        this.callSuper("handle", request, response);

        if (this.getHelper() != null) {
        	this.getHelper().handle(request, response);
        }
    },

    /*public synchronized void setClientRoot(
            Class<? extends ServerResource> clientRootClass) {
        setOutboundRoot(clientRootClass);
    }*/

    /*setConnectorService: function(connectorService) {
        this.getServices().set(connectorService);
    },*/

    /*public void setConnegService(ConnegService connegService) {
        getServices().set(connegService);
    }*/

    setContext: function(context) {
        this.callSuper("setContext", context);
        this.getHelper().setContext(context);
        this.getServices().setContext(context);
    },

    /*public void setConverterService(ConverterService converterService) {
        getServices().set(converterService);
    }*/

    /*public void setDecoderService(DecoderService decoderService) {
        getServices().set(decoderService);
    }*/

    /*public void setEncoderService(EncoderService encoderService) {
        getServices().set(encoderService);
    }*/

    /*public synchronized void setInboundRoot(
            Class<? extends ServerResource> inboundRootClass) {
        setInboundRoot(createFinder(inboundRootClass));
    }*/

    setInboundRoot: function(inboundRoot) {
        this.inboundRoot = inboundRoot;

        if ((inboundRoot != null) && (inboundRoot.getContext() == null)) {
            inboundRoot.setContext(getContext());
        }
    },

    /*public void setMetadataService(MetadataService metadataService) {
        getServices().set(metadataService);
    }*/

    /*public synchronized void setOutboundRoot(
            Class<? extends ServerResource> outboundRootClass) {
        setOutboundRoot(createFinder(outboundRootClass));
    }*/

    setOutboundRoot: function(outboundRoot) {
        this.outboundRoot = outboundRoot;

        if ((outboundRoot != null) && (outboundRoot.getContext() == null)) {
            outboundRoot.setContext(getContext());
        }
    },

    /*public void setRangeService(RangeService rangeService) {
        getServices().set(rangeService);
    }*/

    setRoles: function(roles) {
        if (roles != this.getRoles()) {
        	this.getRoles().clear();

            if (roles != null) {
            	this.getRoles().addAll(roles);
            }
        }
    },

    /*public void setStatusService(StatusService statusService) {
        getServices().set(statusService);
    }*/

    /*public void setTunnelService(TunnelService tunnelService) {
        getServices().set(tunnelService);
    }*/

    start: function() {
        if (this.isStopped()) {
            if (this.getHelper() != null) {
            	this.getHelper().start();
            }

            this.getServices().start();

            if (this.getInboundRoot() != null) {
            	this.getInboundRoot().start();
            }

            if (this.getOutboundRoot() != null) {
            	this.getOutboundRoot().start();
            }

            // Must be invoked as a last step
            this.callSuper("start");
        }
    },

    stop: function() {
        if (this.isStarted()) {
            // Must be invoked as a first step
            this.callSuper("stop");

            if (this.getOutboundRoot() != null) {
            	this.getOutboundRoot().stop();
            }

            if (this.getInboundRoot() != null) {
            	this.getInboundRoot().stop();
            }

            this.getServices().stop();

            if (this.getHelper() != null) {
            	this.getHelper().stop();
            }

            // Clear the annotations cache
            //[class AnnotationUtils].getInstance().clearCache();
        }
    }
});

Application.extend({
	create: function(fnInbound, fnOutbound) {
		var application = new Application();
		application.createInboundRoot = fnInbound;
		if (fnOutbound!=null) {
			application.createOutboundRoot = fnOutbound;
		}
		return application;
	}
});