function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnAndroidBackButton_Click() {
        bIsSavingInProgress || Back();
    }
    function Back() {
        try {
            $.teamPersonalDataWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnCreateSign1_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                Alloy.Globals.createAndOpenControllerExt("CreateSignPaintView", {
                    component_number: 1,
                    mode: "AeDES"
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnViewSign1_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                var view_sign_param = null;
                if (Alloy.Globals.AeDESCurrentSign1) view_sign_param = Alloy.Globals.AeDESCurrentSign1; else if (Alloy.Globals.AeDESCurrentSignPath1) {
                    var file = Alloy.Globals.getFileForRead(Alloy.Globals.AeDESCurrentSignPath1);
                    file && (view_sign_param = file.getNativePath());
                }
                view_sign_param ? Alloy.Globals.createAndOpenControllerExt("ViewSignView", {
                    image: view_sign_param
                }) : alert(L("no_sign_image_available_msg"));
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnCreateSign2_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                Alloy.Globals.createAndOpenControllerExt("CreateSignPaintView", {
                    component_number: 2,
                    mode: "AeDES"
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnViewSign2_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                var view_sign_param = null;
                if (Alloy.Globals.AeDESCurrentSign2) view_sign_param = Alloy.Globals.AeDESCurrentSign2; else if (Alloy.Globals.AeDESCurrentSignPath2) {
                    var file = Alloy.Globals.getFileForRead(Alloy.Globals.AeDESCurrentSignPath2);
                    file && (view_sign_param = file.getNativePath());
                }
                view_sign_param ? Alloy.Globals.createAndOpenControllerExt("ViewSignView", {
                    image: view_sign_param
                }) : alert(L("no_sign_image_available_msg"));
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnCreateSign3_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                Alloy.Globals.createAndOpenControllerExt("CreateSignPaintView", {
                    component_number: 3,
                    mode: "AeDES"
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnViewSign3_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                var view_sign_param = null;
                if (Alloy.Globals.AeDESCurrentSign3) view_sign_param = Alloy.Globals.AeDESCurrentSign3; else if (Alloy.Globals.AeDESCurrentSignPath3) {
                    var file = Alloy.Globals.getFileForRead(Alloy.Globals.AeDESCurrentSignPath3);
                    file && (view_sign_param = file.getNativePath());
                }
                view_sign_param ? Alloy.Globals.createAndOpenControllerExt("ViewSignView", {
                    image: view_sign_param
                }) : alert(L("no_sign_image_available_msg"));
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSave_Click() {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: L("generic_save_title"),
            message: L("save_confirm_msg"),
            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
            cancel: 1
        });
        alertDialog.addEventListener("click", function(e) {
            0 == e.index ? BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                try {
                    bIsSavingInProgress = true;
                    var bError = false;
                    if (Alloy.Globals.AeDESCurrentSign1) {
                        Ti.API.info("\nFirst team component:\n");
                        Alloy.Globals.AeDESCurrentSignPath1 || (Alloy.Globals.AeDESCurrentSignPath1 = new Date().getTime() + "_sign1.png");
                        var file = Alloy.Globals.getFileForWrite(Alloy.Globals.AeDESCurrentSignPath1);
                        file.exists() && file.deleteFile();
                        if (file.write(Alloy.Globals.AeDESCurrentSign1)) ; else {
                            Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                            bError = true;
                        }
                    }
                    if (!bError) {
                        var recoverTeamPD = Alloy.createCollection("TeamPD");
                        recoverTeamPD.fetch({
                            query: "SELECT * FROM TeamPD where ID = " + id1
                        });
                        if (recoverTeamPD.length > 0) {
                            var currentTeamPD = recoverTeamPD.at(0);
                            currentTeamPD.set({
                                SIGN_PATH: Alloy.Globals.AeDESCurrentSignPath1,
                                NAME: $.widgetAppTextFieldName1.get_text_value()
                            });
                            currentTeamPD.save();
                            currentTeamPD = null;
                        } else {
                            var teamPDModel = Alloy.createModel("TeamPD", {
                                COMPONENT_NUMBER: 1,
                                SIGN_PATH: Alloy.Globals.AeDESCurrentSignPath1,
                                NAME: $.widgetAppTextFieldName1.get_text_value()
                            });
                            teamPDModel.save();
                            teamPDModel = null;
                        }
                        recoverTeamPD = null;
                        if (Alloy.Globals.AeDESCurrentSign2) {
                            Ti.API.info("\nSecond team component:\n");
                            Alloy.Globals.AeDESCurrentSignPath2 || (Alloy.Globals.AeDESCurrentSignPath2 = new Date().getTime() + "_sign2.png");
                            var file = Alloy.Globals.getFileForWrite(Alloy.Globals.AeDESCurrentSignPath2);
                            file.exists() && file.deleteFile();
                            if (file.write(Alloy.Globals.AeDESCurrentSign2)) ; else {
                                Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                bError = true;
                            }
                        }
                        var recoverTeamPD = Alloy.createCollection("TeamPD");
                        recoverTeamPD.fetch({
                            query: "SELECT * FROM TeamPD where ID = " + id2
                        });
                        if (recoverTeamPD.length > 0) {
                            var currentTeamPD = recoverTeamPD.at(0);
                            currentTeamPD.set({
                                SIGN_PATH: Alloy.Globals.AeDESCurrentSignPath2,
                                NAME: $.widgetAppTextFieldName2.get_text_value()
                            });
                            currentTeamPD.save();
                            currentTeamPD = null;
                        } else {
                            var teamPDModel = Alloy.createModel("TeamPD", {
                                COMPONENT_NUMBER: 2,
                                SIGN_PATH: Alloy.Globals.AeDESCurrentSignPath2,
                                NAME: $.widgetAppTextFieldName2.get_text_value()
                            });
                            teamPDModel.save();
                            teamPDModel = null;
                        }
                        recoverTeamPD = null;
                        if (!bError) {
                            if (Alloy.Globals.AeDESCurrentSign3) {
                                Ti.API.info("\nThird team component:\n");
                                Alloy.Globals.AeDESCurrentSignPath3 || (Alloy.Globals.AeDESCurrentSignPath3 = new Date().getTime() + "_sign3.png");
                                var file = Alloy.Globals.getFileForWrite(Alloy.Globals.AeDESCurrentSignPath3);
                                file.exists() && file.deleteFile();
                                if (file.write(Alloy.Globals.AeDESCurrentSign3)) ; else {
                                    Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    bError = true;
                                }
                            }
                            if (bError) Ti.API.info("ERROR.\nEND"); else {
                                var recoverTeamPD = Alloy.createCollection("TeamPD");
                                recoverTeamPD.fetch({
                                    query: "SELECT * FROM TeamPD where ID = " + id3
                                });
                                if (recoverTeamPD.length > 0) {
                                    var currentTeamPD = recoverTeamPD.at(0);
                                    currentTeamPD.set({
                                        SIGN_PATH: Alloy.Globals.AeDESCurrentSignPath3,
                                        NAME: $.widgetAppTextFieldName3.get_text_value()
                                    });
                                    currentTeamPD.save();
                                    currentTeamPD = null;
                                } else {
                                    var teamPDModel = Alloy.createModel("TeamPD", {
                                        COMPONENT_NUMBER: 3,
                                        SIGN_PATH: Alloy.Globals.AeDESCurrentSignPath3,
                                        NAME: $.widgetAppTextFieldName3.get_text_value()
                                    });
                                    teamPDModel.save();
                                    teamPDModel = null;
                                }
                                recoverTeamPD = null;
                                Alloy.Collections.AeDESModePD.fetch({
                                    query: "SELECT * FROM TeamPD"
                                });
                                if (Alloy.Collections.AeDESModePD.length > 0) for (var i = 0; i < Alloy.Collections.AeDESModePD.length; i++) {
                                    var personalData = Alloy.Collections.AeDESModePD.at(i);
                                    switch (personalData.get("COMPONENT_NUMBER")) {
                                      case 1:
                                        id1 = personalData.get("ID");
                                        break;

                                      case 2:
                                        id2 = personalData.get("ID");
                                        break;

                                      case 3:
                                        id3 = personalData.get("ID");
                                    }
                                }
                                bRet = true;
                            }
                        }
                    }
                } catch (exception) {
                    alert(L("generic_exception_msg") + exception.message);
                } finally {
                    bIsSavingInProgress = false;
                }
                return bRet;
            }) : 1 == e.index;
        });
        alertDialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TeamPersonalData";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.teamPersonalDataWindow = Ti.UI.createWindow({
        title: L("edit_team_personal_data_view_title"),
        backgroundColor: "#ffffcc",
        id: "teamPersonalDataWindow"
    });
    $.__views.teamPersonalDataWindow && $.addTopLevelView($.__views.teamPersonalDataWindow);
    OnAndroidBackButton_Click ? $.__views.teamPersonalDataWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.teamPersonalDataWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.teamPersonalDataWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.teamPersonalDataWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        color: "#000",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 11,
            fontWeight: "bold"
        },
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        zIndex: 1,
        id: "activity_indicator"
    });
    $.__views.teamPersonalDataWindow.add($.__views.activity_indicator);
    $.__views.scrollView_fields = Ti.UI.createScrollView({
        top: 20,
        scrollType: "vertical",
        id: "scrollView_fields"
    });
    $.__views.teamPersonalDataWindow.add($.__views.scrollView_fields);
    $.__views.viewAppTextFieldName1 = Ti.UI.createView({
        top: 110,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldName1"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldName1);
    $.__views.widgetAppTextFieldName1 = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldName1",
        __parentSymbol: $.__views.viewAppTextFieldName1
    });
    $.__views.widgetAppTextFieldName1.setParent($.__views.viewAppTextFieldName1);
    $.__views.viewAppTextFieldName2 = Ti.UI.createView({
        top: 270,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldName2"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldName2);
    $.__views.widgetAppTextFieldName2 = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldName2",
        __parentSymbol: $.__views.viewAppTextFieldName2
    });
    $.__views.widgetAppTextFieldName2.setParent($.__views.viewAppTextFieldName2);
    $.__views.viewAppTextFieldName3 = Ti.UI.createView({
        top: 430,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldName3"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldName3);
    $.__views.widgetAppTextFieldName3 = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldName3",
        __parentSymbol: $.__views.viewAppTextFieldName3
    });
    $.__views.widgetAppTextFieldName3.setParent($.__views.viewAppTextFieldName3);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 500,
        width: 72,
        id: "viewAppButtonSave"
    });
    $.__views.scrollView_fields.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var controls = new Array();
    controls.push($.widgetAppButtonSave.get_button());
    controls.push($.widgetAppButtonCreateSign1.get_button());
    controls.push($.widgetAppButtonViewSign1.get_button());
    controls.push($.widgetAppButtonCreateSign2.get_button());
    controls.push($.widgetAppButtonViewSign2.get_button());
    controls.push($.widgetAppButtonCreateSign3.get_button());
    controls.push($.widgetAppButtonViewSign3.get_button());
    var id1 = null;
    var id2 = null;
    var id3 = null;
    var bIsSavingInProgress = false;
    try {
        Alloy.Globals.AeDESCurrentSignPath1 = "";
        Alloy.Globals.AeDESCurrentSignPath2 = "";
        Alloy.Globals.AeDESCurrentSignPath3 = "";
        Alloy.Collections.AeDESModePD.fetch({
            query: "SELECT * FROM TeamPD"
        });
        if (Alloy.Collections.AeDESModePD.length > 0) for (var i = 0; i < Alloy.Collections.AeDESModePD.length; i++) {
            var personalData = Alloy.Collections.AeDESModePD.at(i);
            switch (personalData.get("COMPONENT_NUMBER")) {
              case 1:
                $.widgetAppTextFieldName1.set_text_value(personalData.get("NAME"));
                id1 = personalData.get("ID");
                Alloy.Globals.AeDESCurrentSignPath1 = personalData.get("SIGN_PATH");
                break;

              case 2:
                $.widgetAppTextFieldName2.set_text_value(personalData.get("NAME"));
                id2 = personalData.get("ID");
                Alloy.Globals.AeDESCurrentSignPath2 = personalData.get("SIGN_PATH");
                break;

              case 3:
                $.widgetAppTextFieldName3.set_text_value(personalData.get("NAME"));
                id3 = personalData.get("ID");
                Alloy.Globals.AeDESCurrentSignPath3 = personalData.get("SIGN_PATH");
            }
        }
        Alloy.Globals.AeDESCurrentSign1 = null;
        Alloy.Globals.AeDESCurrentSign2 = null;
        Alloy.Globals.AeDESCurrentSign3 = null;
        $.widgetAppTextFieldName1.init(L("generic_name_1_txt_hint"));
        $.widgetAppTextFieldName2.init(L("generic_name_2_txt_hint"));
        $.widgetAppTextFieldName3.init(L("generic_name_3_txt_hint"));
        $.widgetAppButtonCreateSign1.init("/images/create_sign_normal.png", "/images/create_sign_pressed.png", "/images/create_sign_disabled.png", L("generic_create_sign_1_btn_title"), OnBtnCreateSign1_Click);
        $.widgetAppButtonViewSign1.init("/images/view_sign_normal.png", "/images/view_sign_pressed.png", "/images/view_sign_disabled.png", L("generic_view_sign_1_btn_title"), OnBtnViewSign1_Click);
        $.widgetAppButtonCreateSign2.init("/images/create_sign_normal.png", "/images/create_sign_pressed.png", "/images/create_sign_disabled.png", L("generic_create_sign_2_btn_title"), OnBtnCreateSign2_Click);
        $.widgetAppButtonViewSign2.init("/images/view_sign_normal.png", "/images/view_sign_pressed.png", "/images/view_sign_disabled.png", L("generic_view_sign_2_btn_title"), OnBtnViewSign2_Click);
        $.widgetAppButtonCreateSign3.init("/images/create_sign_normal.png", "/images/create_sign_pressed.png", "/images/create_sign_disabled.png", L("generic_create_sign_3_btn_title"), OnBtnCreateSign3_Click);
        $.widgetAppButtonViewSign3.init("/images/view_sign_normal.png", "/images/view_sign_pressed.png", "/images/view_sign_disabled.png", L("generic_view_sign_3_btn_title"), OnBtnViewSign3_Click);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.teamPersonalDataWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.teamPersonalDataWindow!android:back!OnAndroidBackButton_Click"] && $.__views.teamPersonalDataWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.teamPersonalDataWindow!androidback!OnAndroidBackButton_Click"] && $.__views.teamPersonalDataWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;