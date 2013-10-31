ContactManager.module('ContactsApp.Show', function (Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showContact: function (id) {
            var loadingView = new ContactManager.Common.Views.Loading({
                title: "Data Loading for single user",
                message: "Data loading artificially delayed from server"
            });
            ContactManager.mainRegion.show(loadingView);
            var fetchingContact = ContactManager.request("contact:entity", id);
            $.when(fetchingContact).done(function (contact) {
                var contactView;
                if (contact !== undefined) {
                    contactView = new Show.Contact({
                        model: contact
                    });
                    console.log(contact);

                    contactView.on("contact:edit", function (contact) {
                        ContactManager.trigger("contact:edit", contact.get('_id'));
                    });
                }
                else {
                    contactView = new Show.MissingContact();
                }

                ContactManager.mainRegion.show(contactView);
            });
        }
    }
});



