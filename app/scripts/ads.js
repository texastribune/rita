var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

(function() {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  var useSSL = 'https:' === document.location.protocol;
  gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(gads, node);
})();

googletag.cmd.push(function() {
  googletag.pubads().setTargeting('tribpedia', 'rita');

  var mapping = googletag.sizeMapping().addSize([780, 140], [728, 90]).build();

  googletag.defineSlot('/5805113/TexasTribune_Content_NewsApps_BTF_Footer_Leaderboard_728x90', [300, 250], 'gpt-ad-banner-1')
    .defineSizeMapping(mapping)
    .addService(googletag.pubads());

  googletag.defineSlot('/5805113/TexasTribune_Content_NewsApps_BTF_Leaderboard2_728x90', [300, 250], 'gpt-ad-banner-2')
    .defineSizeMapping(mapping)
    .addService(googletag.pubads());

  googletag.defineSlot('/5805113/TexasTribune_Content_NewsApps_BTF_Leaderboard3_728x90', [300, 250], 'gpt-ad-banner-3')
    .defineSizeMapping(mapping)
    .addService(googletag.pubads());

  googletag.defineSlot('/5805113/TexasTribune_Content_NewsApps_TTRectangle1_300x250', [300, 250], 'gpt-ad-box-1')
    .addService(googletag.pubads());

  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});

googletag.cmd.push(function() {
  googletag.display('gpt-ad-banner-1');
  googletag.display('gpt-ad-banner-2');
  googletag.display('gpt-ad-banner-3');
  googletag.display('gpt-ad-box-1');
});
