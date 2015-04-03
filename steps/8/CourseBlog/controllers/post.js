/**
 * Created by Abdelkader on 2015-02-04.
 */
CourseBlog.PostController = Ember.ObjectController.extend({
    isEditing: false,
    actions: {
        edit: function(){
            this.set('isEditing', true);
        },
        save: function(){
            this.set('isEditing', false);
        }
    }
});