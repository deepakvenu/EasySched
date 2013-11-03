SuperAppManager.module('Entities', function (Entities, SuperAppManager, Backbone, Marionette, $, _) {
    //Model with base url Root
    Entities.business = Backbone.Model.extend({
        urlRoot: "business",

        //defaults are provided so that if no data is fetched then it doesn't give an error on template while rendering
        defaults: {
            businessName: '',
            category: '',
            rating: ''
        },

        idAttribute: "_id",

        //Validating the input from user before saving the data into db
        validate: function (attrs, options) {
            var errors = {}
            if (!attrs.businessName) {
                errors.businessName = "can't be blank";
            }
            if (!attrs.category) {
                errors.category = "can't be blank";
            }
            if (!attrs.rating) {
                errors.rating = "can't be blank";
            }
            else {
                if (attrs.rating.length < 10) {
                    errors.rating = "is too short";
                }
            }
            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    });


    //Collection with url
    Entities.businessCollection = Backbone.Collection.extend({
        url: "business",
        model: Entities.business,
        comparator: "businessName"
    });

 

    //Defining the API which exposes our data from the db
    var API = {
        getBusinessEntities: function () {
            var businesses = new Entities.businessCollection();
            //defining Deferred object to return the promise once data is available
            var defer = $.Deferred();
            //sending AJAX request to /businesss to get all businesss
            businesses.fetch({
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (data) {
                    defer.resolve(undefined);
                }
            });

            //lookup common.js for more on this part
            //returning promise of Deferred object which will get the data
            return defer.promise();
        },

        getBusinessEntity: function (businessId) {
            var business = new Entities.business({_id: businessId});
            var defer = $.Deferred();

            business.fetch({
                success: function (data) {
                    defer.resolve(data);
                },

                error: function (data) {
                    defer.resolve(undefined);
                }
            });

            return defer.promise();
        }
    };
//SuperAppManager.request("business:entities");
    SuperAppManager.reqres.setHandler("business:entities", function () {
        return API.getBusinessEntities();
    });

//SuperAppManager.request("business:entity");
    SuperAppManager.reqres.setHandler("business:entity", function (_id) {
        return API.getBusinessEntity(_id);
    });

});




