angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("modules/articles/views/create-article.client.view.html",
    "<section data-ng-controller=\"ArticlesController\"><div class=\"page-header\"><h1>New Article</h1></div><div class=\"col-md-12\"><form name=\"articleForm\" class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error': articleForm.title.$dirty && articleForm.title.$invalid }\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"content\">Content</label><div class=\"controls\"><textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Content\"></textarea></div></div><div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/articles/views/edit-article.client.view.html",
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>Edit Article</h1></div><div class=\"col-md-12\"><form name=\"articleForm\" class=\"form-horizontal\" data-ng-submit=\"update(articleForm.$valid)\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && articleForm.title.$invalid}\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"article.title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div><div ng-show=\"submitted && articleForm.title.$invalid\" class=\"help-block\"><p ng-show=\"articleForm.title.$error.required\" class=\"text-danger\">Title is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && articleForm.content.$invalid}\"><label class=\"control-label\" for=\"content\">Content</label><div class=\"controls\"><textarea name=\"content\" data-ng-model=\"article.content\" id=\"content\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Content\" required=\"\"></textarea></div><div ng-show=\"submitted && articleForm.content.$invalid\" class=\"help-block\"><p ng-show=\"articleForm.content.$error.required\" class=\"text-danger\">Content is required</p></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Update\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/articles/views/list-articles.client.view.html",
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"find()\"><div class=\"page-header\"><h1>Articles</h1></div><div class=\"list-group\"><a data-ng-repeat=\"article in articles\" data-ng-href=\"#!/articles/{{article._id}}\" class=\"list-group-item\"><small class=\"list-group-item-text\">Posted on <span data-ng-bind=\"article.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"article.user.displayName\"></span></small><h4 class=\"list-group-item-heading\" data-ng-bind=\"article.title\"></h4><p class=\"list-group-item-text\" data-ng-bind=\"article.content\"></p></a></div><div class=\"alert alert-warning text-center\" data-ng-if=\"articles.$resolved && !articles.length\">No articles yet, why don't you <a href=\"/#!/articles/create\">create one</a>?</div></section>"
  );

  $templateCache.put("modules/articles/views/view-article.client.view.html",
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1 data-ng-bind=\"article.title\"></h1></div><div class=\"pull-right\" data-ng-show=\"authentication.user._id == article.user._id\"><a class=\"btn btn-primary\" href=\"/#!/articles/{{article._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div><small><em class=\"text-muted\">Posted on <span data-ng-bind=\"article.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"article.user.displayName\"></span></em></small><p class=\"lead\" data-ng-bind=\"article.content\"></p></section>"
  );

  $templateCache.put("modules/core/views/google-search-demo.html",
    "<html><head><script src=\"https://www.google.com/jsapi\"></script><script>google.load(\"search\", \"1\");\n" +
    "\n" +
    "        // Call this function when the page has been loaded\n" +
    "        function initialize() {\n" +
    "            var searchControl = new google.search.SearchControl();\n" +
    "            searchControl.addSearcher(new google.search.WebSearch());\n" +
    "            //searchControl.addSearcher(new google.search.NewsSearch());\n" +
    "            searchControl.draw(document.getElementById(\"searchcontrol\"));\n" +
    "        }\n" +
    "        google.setOnLoadCallback(initialize);</script></head><body><div id=\"searchcontrol\"></div></body></html>"
  );

  $templateCache.put("modules/core/views/header.client.view.html",
    "<div class=\"container\" data-ng-controller=\"HeaderController\"><div class=\"navbar-header\"><button class=\"navbar-toggle\" type=\"button\" data-ng-click=\"toggleCollapsibleMenu()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a href=\"/#!/\" class=\"navbar-brand\">freelook</a></div><nav class=\"collapse navbar-collapse\" collapse=\"!isCollapsed\" role=\"navigation\"><ul class=\"nav navbar-nav\" data-ng-if=\"menu.shouldRender(authentication.user);\"><li data-ng-repeat=\"item in menu.items | orderBy: 'position'\" data-ng-if=\"item.shouldRender(authentication.user);\" ng-switch=\"item.menuItemType\" ui-route=\"{{item.uiRoute}}\" class=\"{{item.menuItemClass}}\" ng-class=\"{active: ($uiRoute)}\" dropdown=\"item.menuItemType === 'dropdown'\"><a ng-switch-when=\"dropdown\" class=\"dropdown-toggle\"><span data-ng-bind=\"item.title\"></span> <b class=\"caret\"></b></a><ul ng-switch-when=\"dropdown\" class=\"dropdown-menu\"><li data-ng-repeat=\"subitem in item.items | orderBy: 'position'\" data-ng-if=\"subitem.shouldRender(authentication.user);\" ui-route=\"{{subitem.uiRoute}}\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/{{subitem.link}}\" data-ng-bind=\"subitem.title\"></a></li></ul><a ng-switch-default=\"\" href=\"/#!/{{item.link}}\" data-ng-bind=\"item.title\"></a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=\"authentication.user\"><li ui-route=\"/signup\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signup\">Sign Up</a></li><li class=\"divider-vertical\"></li><li ui-route=\"/signin\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signin\">Sign In</a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=\"authentication.user\"><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span data-ng-bind=\"authentication.user.displayName\"></span> <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"/#!/settings/profile\">Edit Profile</a></li><li><a href=\"/#!/settings/accounts\">Manage Social Accounts</a></li><li data-ng-show=\"authentication.user.provider === 'local'\"><a href=\"/#!/settings/password\">Change Password</a></li><li class=\"divider\"></li><li><a href=\"/auth/signout\">Signout</a></li></ul></li></ul></nav></div>"
  );

  $templateCache.put("modules/core/views/info.client.view.html",
    "<md-sidenav class=\"md-sidenav-right\" md-component-id=\"info\"><md-toolbar><h1 class=\"md-toolbar-tools\" translate=\"Info\"></h1></md-toolbar><md-content layout=\"column\" layout-align=\"center center\" layout-padding=\"\"><select flex=\"\" data-ng-controller=\"LangController\" data-ng-model=\"lang\" data-ng-change=\"setLang()\"><option ng-selected=\"lang === 'ru'\">ru</option><option ng-selected=\"lang === 'en'\">en</option></select></md-content></md-sidenav>"
  );

  $templateCache.put("modules/core/views/main.client.view.html",
    "<div data-ng-if=\"route.social\"><div data-ng-if=\"route.social === 'vk'\"><ul class=\"list-group\"><li class=\"list-group-item media\" data-ng-repeat=\"msg in vk.data.items\" data-ng-if=\"msg.text\"><div class=\"media-body\"><h4 class=\"media-heading\"><span data-translate=\"Date\"></span><span class=\"space-left-5\">{{ msg.date | date:'medium'}}</span></h4><p data-ng-bind=\"msg.text\"></p></div></li></ul></div><div data-ng-if=\"route.social === 'google'\"><ul class=\"list-group\"><li class=\"list-group-item media\" data-ng-repeat=\"msg in google.data.results\" data-ng-if=\"msg.content\"><div class=\"media-body\"><h4 class=\"media-heading\" data-ng-bind-html=\"msg.title\"></h4><p data-ng-bind-html=\"msg.content\"></p></div></li></ul></div><div data-ng-if=\"route.social !== 'vk' && route.social !== 'google'\"><span data-i18n=\"soon\"></span></div></div>"
  );

  $templateCache.put("modules/core/views/start.client.view.html",
    "<md-sidenav class=\"md-sidenav-left\" md-component-id=\"start\" md-is-locked-open=\"$media('md')\"><md-toolbar><h1 class=\"md-toolbar-tools\" translate=\"Freelook\"></h1></md-toolbar><md-content layoyt=\"column\" layout-padding=\"\" layout-align=\"space-around\"><div ng-if=\"!conf.ready()\"><md-button flex=\"\" class=\"md-raised\" ng-click=\"add()\" id=\"install\">Add to Chrome</md-button></div><div ng-if=\"conf.ready()\"><md-button flex=\"\" class=\"md-fab md-primary\" ng-if=\"!auth.is('vk')\" ng-click=\"oauth('vk')\" aria-label=\"vk\">vk</md-button><img flex=\"\" class=\"face\" ng-if=\"auth.is('vk')\" ng-src=\"{{auth.user.vk.photo_50}}\" ng-click=\"go({profile:'vk'})\"></div></md-content></md-sidenav>"
  );

  $templateCache.put("modules/users/views/authentication/signin.client.view.html",
    "<section class=\"row\" data-ng-controller=\"AuthenticationController\"><h3 class=\"col-md-12 text-center\">Sign in using your social accounts</h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div><h3 class=\"col-md-12 text-center\">Or with your account</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"signin()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"username\">Username</label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"Username\"></div><div class=\"form-group\"><label for=\"password\">Password</label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" data-ng-model=\"credentials.password\" placeholder=\"Password\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-primary\">Sign in</button>&nbsp; or&nbsp; <a href=\"/#!/signup\">Sign up</a></div><div class=\"forgot-password\"><a href=\"/#!/password/forgot\">Forgot your password?</a></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/authentication/signup.client.view.html",
    "<section class=\"row\" data-ng-controller=\"AuthenticationController\"><h3 class=\"col-md-12 text-center\">Sign up using your social accounts</h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div><h3 class=\"col-md-12 text-center\">Or with your email</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form name=\"userForm\" data-ng-submit=\"signup()\" class=\"signin form-horizontal\" novalidate=\"\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" required=\"\" id=\"firstName\" name=\"firstName\" class=\"form-control\" data-ng-model=\"credentials.firstName\" placeholder=\"First Name\"></div><div class=\"form-group\"><label for=\"lastName\">Last Name</label><input type=\"text\" id=\"lastName\" name=\"lastName\" class=\"form-control\" data-ng-model=\"credentials.lastName\" placeholder=\"Last Name\"></div><div class=\"form-group\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" data-ng-model=\"credentials.email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"username\">Username</label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"Username\"></div><div class=\"form-group\"><label for=\"password\">Password</label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" data-ng-model=\"credentials.password\" placeholder=\"Password\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Sign up</button>&nbsp; or&nbsp; <a href=\"/#!/signin\" class=\"show-signup\">Sign in</a></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/password/forgot-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"PasswordController\"><h3 class=\"col-md-12 text-center\">Restore your password</h3><p class=\"small text-center\">Enter your account username.</p><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"askForPasswordReset()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"Username\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-primary\">Submit</button></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password-invalid.client.view.html",
    "<section class=\"row text-center\"><h3 class=\"col-md-12\">Password reset is invalid</h3><a href=\"/#!/password/forgot\" class=\"col-md-12\">Ask for a new password reset</a></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password-success.client.view.html",
    "<section class=\"row text-center\"><h3 class=\"col-md-12\">Password successfully reset</h3><a href=\"/#!/\" class=\"col-md-12\">Continue to home page</a></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"PasswordController\"><h3 class=\"col-md-12 text-center\">Reset your password</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"resetUserPassword()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"newPassword\">New Password</label><input type=\"password\" id=\"newPassword\" name=\"newPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.newPassword\" placeholder=\"New Password\"></div><div class=\"form-group\"><label for=\"verifyPassword\">Verify Password</label><input type=\"password\" id=\"verifyPassword\" name=\"verifyPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.verifyPassword\" placeholder=\"Verify Password\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Update Password</button></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/change-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\">Change your password</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"changeUserPassword()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"currentPassword\">Current Password</label><input type=\"password\" id=\"currentPassword\" name=\"currentPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.currentPassword\" placeholder=\"Current Password\"></div><div class=\"form-group\"><label for=\"newPassword\">New Password</label><input type=\"password\" id=\"newPassword\" name=\"newPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.newPassword\" placeholder=\"New Password\"></div><div class=\"form-group\"><label for=\"verifyPassword\">Verify Password</label><input type=\"password\" id=\"verifyPassword\" name=\"verifyPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.verifyPassword\" placeholder=\"Verify Password\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Save Password</button></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>Password Changed Successfully</strong></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/edit-profile.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\">Edit your profile</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form name=\"userForm\" data-ng-submit=\"updateUserProfile(userForm.$valid)\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" id=\"firstName\" name=\"firstName\" class=\"form-control\" data-ng-model=\"user.firstName\" placeholder=\"First Name\"></div><div class=\"form-group\"><label for=\"lastName\">Last Name</label><input type=\"text\" id=\"lastName\" name=\"lastName\" class=\"form-control\" data-ng-model=\"user.lastName\" placeholder=\"Last Name\"></div><div class=\"form-group\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" data-ng-model=\"user.email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"username\">Username</label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"user.username\" placeholder=\"Username\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Save Profile</button></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>Profile Saved Successfully</strong></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/social-accounts.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\" data-ng-show=\"hasConnectedAdditionalSocialAccounts()\">Connected social accounts:</h3><div class=\"col-md-12 text-center\"><div data-ng-repeat=\"(providerName, providerData) in user.additionalProvidersData\" class=\"remove-account-container\"><img ng-src=\"/modules/users/img/buttons/{{providerName}}.png\"> <a class=\"btn btn-danger btn-remove-account\" data-ng-click=\"removeUserSocialAccount(providerName)\"><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><h3 class=\"col-md-12 text-center\">Connect other social accounts:</h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" data-ng-hide=\"isConnectedSocialAccount('facebook')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" data-ng-hide=\"isConnectedSocialAccount('twitter')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" data-ng-hide=\"isConnectedSocialAccount('google')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" data-ng-hide=\"isConnectedSocialAccount('linkedin')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" data-ng-hide=\"isConnectedSocialAccount('github')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div></section>"
  );

}]);