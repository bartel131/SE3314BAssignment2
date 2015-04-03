/**
 * Created by Abdelkader on 2015-02-01.
 */
// We create a model of type CourseBlog.Posts
CourseBlog.Post = DS.Model.extend({
    title: DS.attr() ,
    body: DS.attr()
});