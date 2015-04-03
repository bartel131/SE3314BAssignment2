/**
 * Created by Abdelkader on 2015-02-01.
 */
CourseBlog.AboutController =Ember.Controller.extend({
    logoIsShowing : false,

    actions: {
        ShowComponents: function(){
            alert('SE3314b has three main components: Technology, Configuration, and implementation.');
        },
        showLogo: function(){
          this.set ('logoIsShowing', true)  ;
        },
        hideLogo: function(){
            this.set ('logoIsShowing', false)  ;
        }
    }
});