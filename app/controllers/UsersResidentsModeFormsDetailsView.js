var args = arguments[0] || {};
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "form:save_from_section" ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowFormsDetails.close() ;
        }
        else
        {
            $.usersResidentsModeFormsDetailsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Form no textfield change event handler
function OnFormNo_Change( e , type )
{
    Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] = $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.get_text_value() ;
}

// Date picker change event handler
function OnDate_Change( e , type )
{
    Alloy.Globals.UsersResidentsModeDetails["DATE"] = Date.parse( $.datePickerDate.getValue() ) ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    // Init app textfields
    $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.init( L( 'generic_formno_txt_hint' ) , OnFormNo_Change , null , 4 ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.set_text_value( Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.enabled( view_enabled ) ;

    $.viewDisabler.setHeight( $.datePickerDate.getHeight() ) ;
    $.viewDisabler.visible = !view_enabled ;
    if( Alloy.Globals.UsersResidentsModeDetails["DATE"] )
    {
        var saved_date = new Date() ;
        saved_date.setTime( Alloy.Globals.UsersResidentsModeDetails["DATE"] ) ;
        $.datePickerDate.setValue( saved_date ) ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.usersResidentsModeFormsDetailsWindow ,
    [
        $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowFormsDetails.open() ;
    }
    else
    {
        $.usersResidentsModeFormsDetailsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}