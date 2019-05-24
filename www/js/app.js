const ncmb = new NCMB("bd8b5948616d8b76b966ecc7825cf1a3338b14d7c42fa790ca2096363dddc4d4", "e68e4ae57e8a5bd217d6b5997b0e073b66c0cd9985100044ce6e54f83065a174");

function signUp(){
  debug_checkuser();
  var user_name = document.forms.signUp_form.signUp_username.value;
  var user_password = document.forms.signUp_form.signUp_password.value;

  var user = new ncmb.User();

  user.set("userName", user_name) /* ユーザー名 */
      .set("password", user_password) /* パスワード */

  // ユーザーの新規登録処理
  user.signUpByAccount()
    .then(function(){
      // 登録後処理
      alert("signup success");
      ncmb.User.login(user_name, user_password)
              .then(function(data){
              // ログイン後処理
              // 登録後処理
              alert("login success");
              document.querySelector('#navigator').pushPage('page2.html');
              debug_checkuser();
              })
              .catch(function(err){
              // エラー処理
                alert("login error");
                debug_checkuser();
              });
    })
    .catch(function(err){
      // エラー処理
      alert("signup error");
      debug_checkuser();
    });
}

function login(){
  var user_name = document.forms.login_form.login_name;
  var user_password = document.forms.login_form.login_password;
  console.log("user_name: " + user_name.value);
  ncmb.User.login(user_name.value, user_password.value)
    .then(function(data){
      // ログイン後処理
      // 登録後処理
      alert("success");
      document.querySelector('#navigator').pushPage('page2.html');
      debug_checkuser();

    })
    .catch(function(err){
      debug_checkuser();
      // エラー処理
    });
}

function langUp() {
  debug_checkuser();
  var langName="";
  langName = document.forms.lang_form.langName.value;
  var currentUser ="";
  currentUser = ncmb.User.getCurrentUser();
  console.log(currentUser.userName);
  // 保存先クラスの作成
  var Lang = ncmb.DataStore("Lang");

  // 保存先クラスのインスタンスを生成
  var lang = new Lang();

  // 値を設定と保存
  lang.set("name", langName)
      .set("user", currentUser)
      .save()
      .then(function(object){
              // 保存に成功した場合の処理
              alert("success");
              document.querySelector('#navigator').resetToPage('page2.html');
              debug_checkuser();
      })
      .catch(function(err){
              // 保存に失敗した場合の処理
        debug_checkuser();
      });
}

function logout(){
  ncmb.User.logout()
        .then(function(){
          // document.querySelector('#navigator').pushPage('page3.html');
          document.querySelector('#navigator').resetToPage('page3.html');
          debug_checkuser();
      })
      .catch(function(err){
              // 保存に失敗した場合の処理
        debug_checkuser();
      });
}

function debug_checkuser() {
  var currentUser = ncmb.User.getCurrentUser();
  if (currentUser) {
    console.log("ログイン中のユーザー: " + currentUser.get("userName"));
  } else {
    console.log("未ログインまたは取得に失敗");
  }
}
