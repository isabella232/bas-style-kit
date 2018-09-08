jQuery(function($){
  sortable('.bsk-sortable-list', {
    items: ':not(.bsk-disabled)',
    placeholderClass: 'bsk-sortable-list-placeholder'
  });
});
