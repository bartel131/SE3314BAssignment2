/**
 * Created by Abdelkader on 2015-02-03.
 */
CourseBlog.PostRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('post', params.post_id);
    }

});