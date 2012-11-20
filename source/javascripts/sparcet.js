var sparcet = (function(){
  function render(target, sparcetList){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < sparcetList.length; i++) {
      fragment += '<li><a href="'+sparcetList[i].id+'">'+sparcetList[i].from.name+' said:</a><p>'+sparcetList[i].reason+'</p></li>';
    }
    t.innerHTML = fragment;
  }

  return {
    showSparcets: function(options){
        console.log(options.user + " " + options.count);
      $.ajax({
          url: "http://sparc.sparcet.com/api/sparcets?limit="+options.count+"&to="+options.user
        , type: 'jsonp'
        , error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(response) {
          var sparcetList = [];
          if (!response || !response.data) { return; }
          for (var i = 0; i < response.data.length; i++) {
           // if (options.skip_forks && data[i].fork) { continue; }
            sparcetList.push(response.data[i]);
          }
          sparcetList.sort(function(a, b) {
            var aDate = new Date(a.dateSubmitted).valueOf(),
                bDate = new Date(b.dateSubmitted).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { sparcetList.splice(options.count); }
          render(options.target, sparcetList);
        }
      });
    }
  };
})();
