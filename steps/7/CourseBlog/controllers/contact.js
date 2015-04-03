/**
 * Created by Abdelkader on 2015-02-01.
 */
CourseBlog.ContactController = Ember.Controller.extend({
    actions: {
        sendMessage: function(){
            var msg = prompt ('Type your message:');
        }
    }
});


