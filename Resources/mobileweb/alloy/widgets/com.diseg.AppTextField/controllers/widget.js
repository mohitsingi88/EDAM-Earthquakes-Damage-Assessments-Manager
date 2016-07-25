function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppTextField/" + s : s.substring(0, index) + "/com.diseg.AppTextField/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBtnSpeechRecognition_Click() {
        var ispeech = require("ti.ispeech");
        ispeech.setAPIKey("d5a9d3cda1b1b8c6e4fe90bd8e897db1");
        var dictate = ispeech.createDictation();
        ispeech.requestPermission() ? ispeech.isAvailable() ? dictate.isRecording() ? alert(L("generic_voice_recognition_already_recording_msg")) : dictate.start({
            locale: Alloy.Globals.CurrentLocale(),
            onComplete: function(event_args) {
                event_args.success ? $.set_text_value(event_args.text) : event_args.message && Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + event_args.message);
            }
        }) : alert(L("generic_voice_recognition_disabled_msg")) : alert(L("generic_voice_recognition_no_microphone_permission_msg"));
    }
    new (require("alloy/widget"))("com.diseg.AppTextField");
    this.__widgetId = "com.diseg.AppTextField";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.lblAppTextField = Ti.UI.createLabel({
        top: 0,
        left: 0,
        width: 80,
        height: 50,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "right",
        id: "lblAppTextField"
    });
    $.__views.lblAppTextField && $.addTopLevelView($.__views.lblAppTextField);
    $.__views.btnAppTextFieldSpeechRecognition = Ti.UI.createButton({
        left: 90,
        width: 32,
        title: "",
        height: 32,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        borderRadius: 4,
        backgroundImage: "/images/speech_recognition_normal.png",
        backgroundSelectedImage: "/images/speech_recognition_pressed.png",
        backgroundDisabledImage: "/images/speech_recognition_disabled.png",
        id: "btnAppTextFieldSpeechRecognition"
    });
    $.__views.btnAppTextFieldSpeechRecognition && $.addTopLevelView($.__views.btnAppTextFieldSpeechRecognition);
    OnBtnSpeechRecognition_Click ? $.__views.btnAppTextFieldSpeechRecognition.addEventListener("click", OnBtnSpeechRecognition_Click) : __defers["$.__views.btnAppTextFieldSpeechRecognition!click!OnBtnSpeechRecognition_Click"] = true;
    $.__views.txtAppTextField = Ti.UI.createTextField({
        backgroundColor: "#ffffff",
        color: "black",
        left: 125,
        right: 10,
        height: 50,
        id: "txtAppTextField"
    });
    $.__views.txtAppTextField && $.addTopLevelView($.__views.txtAppTextField);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.init = function(text_msg, on_textfield_change, keyboardType, length_limit, voice_recognition_disabled, maximum_number_value) {
        try {
            $.lblAppTextField.setText(text_msg + " ");
            $.txtAppTextField.setHintText(text_msg);
            on_textfield_change && $.txtAppTextField.addEventListener("change", on_textfield_change);
            if (keyboardType) {
                $.txtAppTextField.setKeyboardType(keyboardType);
                switch (keyboardType) {
                  case Titanium.UI.KEYBOARD_NUMBER_PAD:
                    $.txtAppTextField.addEventListener("change", function(e) {
                        var val = e.source.value;
                        if (maximum_number_value && parseInt(val) > parseInt(maximum_number_value)) {
                            val = maximum_number_value;
                            e.source.value = maximum_number_value;
                        }
                        /[^0-9]/.test(val) ? e.source.value = val.replace(/[^0-9]/gi, "") : false;
                    });
                    break;

                  case Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION:
                    $.txtAppTextField.addEventListener("change", function(e) {
                        var val = e.source.value;
                        /[^0-9.\-\+]/.test(val) ? e.source.value = val.replace(/[^0-9.\-\+]/gi, "") : false;
                    });
                }
            }
            length_limit && $.txtAppTextField.setMaxLength(length_limit);
            if (voice_recognition_disabled) {
                $.btnAppTextFieldSpeechRecognition.visible = false;
                $.txtAppTextField.setLeft($.btnAppTextFieldSpeechRecognition.getLeft());
            }
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.initPassword = function(text_msg) {
        try {
            $.lblAppTextField.setText(text_msg + " ");
            $.txtAppTextField.setHintText(text_msg);
            $.txtAppTextField.setPasswordMask(true);
            $.btnAppTextFieldSpeechRecognition.visible = false;
            $.txtAppTextField.setLeft($.btnAppTextFieldSpeechRecognition.getLeft());
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.get_text_value = function() {
        var text_value_ret = "";
        try {
            text_value_ret = $.txtAppTextField.getValue();
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
        return text_value_ret;
    };
    $.set_text_value = function(text_msg) {
        try {
            $.txtAppTextField.setValue(text_msg);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.set_label_height = function(new_height) {
        try {
            $.lblAppTextField.setHeight(new_height);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.enabled = function(enabled) {
        try {
            $.txtAppTextField.setEditable(enabled);
            $.btnAppTextFieldSpeechRecognition.enabled = enabled;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    __defers["$.__views.btnAppTextFieldSpeechRecognition!click!OnBtnSpeechRecognition_Click"] && $.__views.btnAppTextFieldSpeechRecognition.addEventListener("click", OnBtnSpeechRecognition_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;