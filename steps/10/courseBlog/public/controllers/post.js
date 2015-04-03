/**
 * Created by Abdelkader on 2015-02-04.
 */
CourseBlog.PostController = Ember.ObjectController.extend({
    isEditing: false,
    actions: {
        edit: function () {
            this.set('isEditing', true);
        },
        save: function () {
            this.get('model').save();
            this.set('isEditing', false);
            this.transitionToRoute('posts');
        },
        delete: function () {
            if (confirm ('Are you sure?')) {
                this.get('model').destroyRecord();
                this.transitionToRoute('posts');
            }
       }
    }
});