ENTRIES_CSV_PATH = "entries.csv";

$(document).on('scroll', function(){
    if ( $(window).scrollTop() > 30) {
        $('header').addClass('header-scrolled');
    } else {
        $('header').removeClass('header-scrolled');
    }
});

$(document).ready(async function() {
  await loadFromCSV();
  setAbstractHandlers();
});

function setAbstractHandlers() {
  $('.abstract-toggle').off('click');
  $('.abstract-toggle').on('click', function() {
    let abstract = $(this).closest('.work-entry').children('.abstract');
    abstract.slideToggle(500);
  });
}

async function loadFromCSV() {
  let path = ENTRIES_CSV_PATH;
  let result = await $.ajax({
    method: 'GET',
    url: path
  });
  let entries = CSV.parse(result);
  let headers = entries.shift();

  for(let entry in entries) {
    let template = `<!-- Copy this block to create a new entry in this section -->
      <div class="work-entry">
        <ul>
          <li>
            <a href="${entries[entry][2]}">${entries[entry][1]}</a>
          </li>
        </ul>
        <p>{{ citation }}</p>
        <p class="abstract-toggle">[abstract]</p>
        <article class="abstract">
          ${entries[entry][9]}
        </article>
      </div>
      <br>
      <!-- This is the end of an individual list item --></br>`;
    
    if(entries[entry][3] && entries[entry][3] !== "") {
      let authors = entries[entry][3].split(';');
      let author_urls = entries[entry][4].split(';');
      let citation = "with ";

      let count = 0;

      while(count < authors.length) {
        citation += `<a rel="author" href="${author_urls[count]}">${authors[count]}</a>`;
        if(count < authors.length - 2 && authors.length > 2) {
          citation += ', ';
        }
        else if(count == authors.length - 2) {
          citation += ' and ';
        }

        count++;
      }
      
      if(entries[entry][5] || entries[entry][6] || entries[entry][7] || entries[entry][8]) citation += ', ';
      if(entries[entry][5]) citation += `<i><b>${entries[entry][5]}</b></i>`;
      if(entries[entry][6]) citation += `, ${entries[entry][6]}`;
      if(entries[entry][7]) citation += `, vol.${entries[entry][7]}`;
      if(entries[entry][8]) citation += `, <u>${entries[entry][8]}</u>`;
      if(entries[entry][5] || entries[entry][6] || entries[entry][7] || entries[entry][8]) citation += '.';
      console.log(citation);
      template = template.replace("{{ citation }}", citation);
    }
    else {
      template = template.replace("{{ citation }}", "")
    }
    
    if(entries[entry][0] == "working_paper") $('#working-papers').append(template);
    if(entries[entry][0] == "publication") $('#publications').append(template);
  }
}