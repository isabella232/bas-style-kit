jQuery(function($){
  sortable('.bsk-sortable-table tbody', {
    items: 'tr:not(.bsk-disabled)'
  });
});
