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
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowDamagesMeasuresOfEmergencyStructuralElements.close() ;
        }
        else
        {
            $.shedModeDamagesMeasuresOfEmergencyStructuralElementsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Table view structural elements click event handler
function OnTableViewShedModeFormsMeasuresOfEmergencyStructuralElements_Click( e )
{
    try
    {
        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsDetails' , { structural_elements_id: e.index , father_title: e.row.children[0].text , is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDamagesMeasuresOfEmergencyStructuralElements.open() ;
    }
    else
    {
        $.shedModeDamagesMeasuresOfEmergencyStructuralElementsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}