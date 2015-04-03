/**
 * Created by Abdelkader on 2015-01-31.
 */
CourseBlog = Ember.Application.create();

// This serializer tells Ember that the id field in
// Ember model is the _id field in the MongoDB model and the vise versa.
CourseBlog.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});




