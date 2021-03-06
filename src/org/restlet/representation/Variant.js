var Variant = new [class Class]({
	initialize: function(mediaType, language) {
        this.characterSet = null;
        this.encodings = null;

        if (language != null) {
            this.getLanguages().add(language);
        } else {
            this.languages = null;
        }

        this.mediaType = mediaType;
        this.locationRef = null;
	},
	setMediaType: function(mediaType) {
		this.mediaType = mediaType;
	},
	getMediaType: function() {
		return this.mediaType;
	},
	getCharacterSet: function() {
		return this.characterSet;
	},
	setCharacterSet: function(characterSet) {
		this.characterSet = characterSet;
	},
	getEncodings: function() {
		if (this.encodings==null) {
			this.encodings = [];
		}
		return this.encodings;
	},
	setEncodings: function(encodings) {
		this.encodings = encodings;
	},
	getLocationRef: function() {
		return this.locationRef;
	},
	setLocationRef: function(locationRef) {
		this.locationRef = locationRef;
	},
    getLanguages: function() {
		if (this.languages==null) {
			this.languages = [];
		}
		return this.languages;
	},
	setLanguages: function(languages) {
		this.languages = languages;
	}
});