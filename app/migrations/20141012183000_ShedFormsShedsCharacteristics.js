migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            SITE: "TEXT" ,
            NOT_UNDERGROUND_PLANS_NO: "TEXT" ,
            USAGE: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
