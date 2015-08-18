angular.module("app",["ngAnimate","ngCookies","ngSanitize","ngMaterial","duScroll","ui.router","ui.bootstrap","infinite-scroll"]);
angular.module("app").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,e,r){return r.html5Mode({enabled:!0}),t.state("main",{url:"/",controller:"MainController",controllerAs:"main","abstract":!0,templateProvider:["$templateCache",function(t){return t.get("main/main.html")}]}).state("main.all_posts",{url:"?page",controller:"MainPostController",controllerAs:"mp",params:{category:{value:null}},templateProvider:["$templateCache",function(t){return t.get("main/posts.html")}]}).state("main.posts",{url:"tag/:category?page",controller:"MainPostController",controllerAs:"mp",params:{category:{value:null}},templateProvider:["$templateCache",function(t){return t.get("main/posts.html")}]}).state("post",{url:"/{year:[0-9]{4}}/{month:[0-9]{2}}/:slug/{id:[0-9]*}",controller:"PostController",controllerAs:"post",templateProvider:["$templateCache",function(t){return t.get("post/main.html")}],resolve:{post:["Post","$stateParams",function(t,e){return t.getPost(e.id)}]}}).state("preview",{url:"/post/preview/:p",controller:"PostController",controllerAs:"post",templateProvider:["$templateCache",function(t){return t.get("post/main.html")}],resolve:{post:["Post","$stateParams",function(t,e){return t.getPost(e.p)}]}}),e.otherwise("/")}]);
angular.module("app").run(["$rootScope","$state","$stateParams",function(a,n,o){a.$state=n,a.$stateParams=o,a.config=angular.copy($config),a.api_nonce=WPAPI.api_nonce,a.WP_SETTING=WP_SETTING}]);
angular.module("app").run(["$templateCache",function(a){a.put("footer/footer.html",'<footer class="footer">\n  <div class="container">\n    <div class="row">\n      <div class="col-md-6">\n        <div class="author">\n          <img class="profile" src="{{config.image_url}}profile.jpg" />\n          <div class="title">\n            <div class="name">Charuwit Nodthaisong</div>\n            <div class="subtitle">Web Developer</div>\n            <div class="social">\n              <a href="https://twitter.com/tui2tone" target="_blank"><i class="icon ion-social-twitter"></i></a>\n              <a href="https://th.linkedin.com/in/tui2tone" target="_blank"><i class="icon ion-social-linkedin"></i></a>\n              <a href="https://github.com/tui2tone" target="_blank"><i class="icon ion-social-github"></i></a>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="col-md-6 hidden-xs hidden-sm">\n        <ul class="nav navbar-nav">\n          <li><a href="#">Blog</a></li>\n          <li><a href="#about">Templates</a></li>\n          <li><a href="#contact">About Me</a></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</footer>\n'),a.put("main/main.html",'<div class="jumbotron app-header" ng-style="{\'background-image\': \'url(\' + config.image_url + \'header_bg.jpg)\' }">\n  <img ng-src="{{config.image_url}}logo.png" class="animated fadeInUp">\n</div>\n<div class="blog-list-container container" ui-view>\n</div>\n'),a.put("main/posts.html",'<ul class="blog-categories" ng-init="main.selected_category = mp.selected_category">\n  <li ng-class="{active: main.selected_category == \'All\'}"><a href="/">All</a></li>\n  <li ng-repeat="category in main.categories" ng-class="{active: main.selected_category == category.slug}"><a href="/tag/{{category.slug}}">{{category.name}}</a></li>\n</ul>\n<div class="blog-list" infinite-scroll="mp.loadData()">\n  <div class="row">\n    <div class="col-lg-6 col-md-6" ng-repeat="post in mp.posts ">\n      <a href="/{{post.date | date: \'yyyy\'}}/{{post.date | date: \'MM\'}}/{{post.slug}}/{{post.ID}}" class="blog animated fadeInUp" style="animation-delay: {{post.delay}}s">\n        <div>\n          <img class="img-responsive" ng-src="{{post.featured_image.source}}" />\n          <div class="title" ng-style="{\'background-color\': post.meta.post_color}">\n            <div>\n              <h4>{{post.title}}</h4>\n              <p>{{post.excerpt}}</p>\n            </div>\n          </div>\n        </div>\n      </a>\n    </div>\n    <div class="col-xs-12">\n      <div class="post-loading animated fadeInDown" ng-show="mp.loading">\n        <i class="icon ion-load-c spin"></i>\n        <br>\n        Loading..\n      </div>\n    </div>\n  </div>\n</div>\n'),a.put("navbar/navbar.html",'<nav class="navbar navbar-fixed-top navbar-affix navbar-default" role="navigation" data-spy="affix" data-offset-top="60">\n  <div class="container">\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#">\n        <img src="{{config.image_url}}mini-logo-w.png" />\n      </a>\n    </div>\n    <div id="navbar" class="collapse navbar-collapse navbar-right">\n      <ul class="nav navbar-nav">\n        <li>\n          <button type="button" class="navbar-close visible-xs" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n            <i class="icon ion-close-round"></i>\n          </button>\n        </li>\n        <li class="active"><a href="#">Blog</a></li>\n        <li><a href="#about">Templates</a></li>\n        <li><a href="#contact">About Me</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n<div class="loading-progress animated fadeInDown" loading-bar>\n  <i class="icon ion-record"></i>\n  <md-progress-circular class="md-hue-2" md-mode="indeterminate"></md-progress-circular>\n</div>\n'),a.put("post/main.html",'<div class="jumbotro post-header" data-stellar-background-ratio="0.5" style="background-image: url({{post.data.featured_image.source}})">\n</div>\n<div class="container">\n  <div class="post-container">\n    <div class="post-title  animated fadeInUp">\n      <h3>{{post.data.title}}</h3>\n      <h4>{{post.data.excerpt}}</h4>\n      <p class="post-date">{{post.data.date | date: "dd MMM yyyy HH:mm"}}</p>\n    </div>\n    <div class="post-content animated fadeInUp" ng-bind-html="post.data.content">\n\n    </div>\n  </div>\n</div>\n')}]);
angular.module("app").factory("Category",["$http","$q",function(e,r){var t;return t=function(){var t;return t=r.defer(),e.get("/wp-json/taxonomies/category/terms").success(function(e){return t.resolve(e)}).error(function(){return t.reject("Cannot load categories")}),t.promise},{getCategories:t}}]);
angular.module("app").factory("Post",["$http","$q","$rootScope",function(r,e,n){var o,t;return t=function(n){var o,t;return o=e.defer(),t=[],angular.forEach(n,function(r,e){return t.push("page"===e?e+"="+r:"filter["+e+"]="+r)}),r.get("/wp-json/posts?"+t.join("&")).success(function(r){return o.resolve(r)}).error(function(){return o.reject("Cannot load posts")}),o.promise},o=function(o){var t;return t=e.defer(),r.get("/wp-json/posts/"+o,{headers:{"X-WP-Nonce":n.api_nonce}}).success(function(r){return t.resolve(r)}).error(function(){return t.reject("Cannot load posts")}),t.promise},{getPosts:t,getPost:o}}]);
angular.module("app").controller("MainController",["Post","Category","$rootScope",function(e,t,r){var o;return r.WP_SETTING.SITE_TITLE=r.WP_SETTING.TITLE+" : "+r.WP_SETTING.DESCRIPTION,r.WP_SETTING.SITE_THUMBNAIL="",o=this,o.selected_category="All",o.categories=[],o.loading=!1,o.getCategories=function(){return t.getCategories().then(function(e){return o.categories=e})},o.init=function(){return o.getCategories()},o.init(),o}]);
angular.module("app").directive("loadingBar",["$http",function(n){return{restrict:"A",link:function(i,t,e){i.isLoading=function(){return n.pendingRequests.length>0},i.$watch(i.isLoading,function(n){n?t.show():t.hide()})}}}]);
angular.module("app").controller("MainPostController",["Post","Category","$state","$stateParams",function(e,a,t,g){var n;return n=this,n.selected_category=g.category||"All",n.paging={page:g.page||1,loaded:!1},n.posts=[],n.loading=!1,n.getPosts=function(){var a;return n.loading=!0,a={},"All"!==n.selected_category&&(a.category_name=n.selected_category),a.order="DESC",a.posts_per_page=10,a.page=n.paging.page,e.getPosts(a).then(function(e){return n.loadingData(e),n.loading=!1})},n.loadingData=function(e){var a,g;return 0===e.length&&(n.paging.loaded=!0,n.paging.page--),g={},"All"!==n.selected_category&&(g.category=n.selected_category),n.paging.page>1&&(g.page=n.paging.page),t.go(t.current,g,{notify:!1}),a=0,angular.forEach(e,function(e){return e.delay=a,n.posts.push(e),a+=.1})},n.loadData=function(){return n.paging.loaded||n.loading?void 0:(n.paging.page++,n.getPosts())},n.init=function(){return n.getPosts()},n.init(),n}]);
angular.module("app").controller("PostController",["post","$document","$rootScope",function(o,t,r){var e;return r.WP_SETTING.SITE_TITLE=o.title+" "+o.excerpt+" : "+r.WP_SETTING.TITLE,r.WP_SETTING.SITE_THUMBNAIL=o.featured_image.source,e=this,e.data=o,e.scrollTop=function(){return t.scrollTopAnimated(0,500)},e.init=function(){return e.scrollTop()},e.init(),e}]);