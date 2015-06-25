/* Custom JavaScript for the BAS Style Kit */

/*
 * Respond to 'feedback' trigger events - requires jQuery
 */

window.ATL_JQ_PAGE_PROPS =  {
    "triggerFunction": function(showCollectorDialog) {

        jQuery('a[data-bsk-action="open-feedback-form"], button[data-bsk-action="open-feedback-form"]').click(function(e) {
            e.preventDefault();
            showCollectorDialog();
        });
    }
};
