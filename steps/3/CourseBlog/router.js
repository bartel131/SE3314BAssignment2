/**
 * Created by Abdelkader on 2015-01-31.
 */
CourseBlog.Router.map(function() {
    this.resource('posts', {path: '/'});
    this.resource('about');
    this.resource('contact');
});
