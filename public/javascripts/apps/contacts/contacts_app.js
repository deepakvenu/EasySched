ContactManager.module('ContactsApp', function (ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "contacts": "listContacts",
            "contacts/:id": "showContact",
            "contacts/:id/edit": "editContact"
        }
    });

    var API = {
        listContacts: function () {
            ContactManager.ContactsApp.List.Controller.listContacts();
        },

        showContact: function (id) {
            ContactsApp.Show.Controller.showContact(id);
        },

        editContact: function (id) {
            ContactsApp.Edit.Controller.editContact(id);
        }
    };


    ContactManager.on("contacts:list", function () {
        ContactManager.navigate("contacts");
        API.listContacts();
    });

    ContactManager.on("contact:show", function (id) {
        //only impacting the URL in the address bar
        ContactManager.navigate("contacts/" + id);
        //actually redirecting page to display correct contect
        API.showContact(id);
    });

    ContactManager.on("contact:edit", function (id) {
        ContactManager.navigate("contacts/" + id + "/edit");
        API.editContact(id);
    });

    ContactManager.addInitializer(function () {
        new ContactsApp.Router({
            controller: API
        });
    });
});
