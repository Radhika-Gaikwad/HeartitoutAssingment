new Vue({
  el: '#app',
  data: {
    results: [], // Accordion menus and cards data
    activeMenu: null, // Track the active menu
    borderColors: ["#2B7397", "#32959D", "#9C7777", "#FF33A8", "#33FFA1"], // Card border colors
    backgroundColors: [""], // Card background colors
    notification: '',
    activeIndex: 0,
    sliderDirection: 'next', // Tracks current direction (next/prev)
    cards: [
      { id: 1, title: 'Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae eros at metus luctus malesuada. Fusce quis nulla vel nulla posuere fringilla. Ut scelerisque, ligula non auctor tristique, nulla felis convallis nisi, sit amet placerat lorem odio eu ligula. Integer ultricies, sem nec feugiat tincidunt, enim metus venenatis arcu, ut porttitor ligula lorem id felis. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum. Cras vel urna a elit consectetur varius. Mauris auctor, ligula non fermentum tempor, ante metus iaculis nunc, sed dictum augue sem sed leo. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum.' },
      { id: 2, title: 'Card 2', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae eros at metus luctus malesuada. Fusce quis nulla vel nulla posuere fringilla. Ut scelerisque, ligula non auctor tristique, nulla felis convallis nisi, sit amet placerat lorem odio eu ligula. Integer ultricies, sem nec feugiat tincidunt, enim metus venenatis arcu, ut porttitor ligula lorem id felis. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum. Cras vel urna a elit consectetur varius. Mauris auctor, ligula non fermentum tempor, ante metus iaculis nunc, sed dictum augue sem sed leo. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum.' },
      { id: 3, title: 'Card 3', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae eros at metus luctus malesuada. Fusce quis nulla vel nulla posuere fringilla. Ut scelerisque, ligula non auctor tristique, nulla felis convallis nisi, sit amet placerat lorem odio eu ligula. Integer ultricies, sem nec feugiat tincidunt, enim metus venenatis arcu, ut porttitor ligula lorem id felis. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum. Cras vel urna a elit consectetur varius. Mauris auctor, ligula non fermentum tempor, ante metus iaculis nunc, sed dictum augue sem sed leo. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum.' },
      { id: 4, title: 'Card 4', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae eros at metus luctus malesuada. Fusce quis nulla vel nulla posuere fringilla. Ut scelerisque, ligula non auctor tristique, nulla felis convallis nisi, sit amet placerat lorem odio eu ligula. Integer ultricies, sem nec feugiat tincidunt, enim metus venenatis arcu, ut porttitor ligula lorem id felis. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum. Cras vel urna a elit consectetur varius. Mauris auctor, ligula non fermentum tempor, ante metus iaculis nunc, sed dictum augue sem sed leo. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum.' },
      { id: 5, title: 'Card 5', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae eros at metus luctus malesuada. Fusce quis nulla vel nulla posuere fringilla. Ut scelerisque, ligula non auctor tristique, nulla felis convallis nisi, sit amet placerat lorem odio eu ligula. Integer ultricies, sem nec feugiat tincidunt, enim metus venenatis arcu, ut porttitor ligula lorem id felis. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum. Cras vel urna a elit consectetur varius. Mauris auctor, ligula non fermentum tempor, ante metus iaculis nunc, sed dictum augue sem sed leo. Nulla facilisi. Donec ut sapien tortor. Etiam a augue eget lorem dapibus interdum.' }
    ]
  },
  methods: {
    async fetchShows(word) {
      try {
        const response = await fetch(`http://api.tvmaze.com/search/shows?q=${word}`);
        const data = await response.json();

        const shows = data.slice(0, 3).map(item => {
          const fullSummary = item.show.summary || "No summary available.";
          const truncatedSummary = this.truncateText(fullSummary);
          return {
            name: item.show.name,
            type: item.show.type,
            fullSummary, // Full content
            truncatedSummary, // Truncated summary
            expanded: false, // Tracks if "Read More" is clicked
            price: this.generatePrice(),
            url: item.show.officialSite || item.show.url
          };
        });

        this.results.push({ word, shows });
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    },
    truncateText(text) {
      const div = document.createElement("div");
      div.innerHTML = text;
      const plainText = div.textContent || div.innerText || "";
      return plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;
    },
    expandSummary(menuIdx, cardIdx) {
      const show = this.results[menuIdx].shows[cardIdx];
      show.expanded = true; // Mark the show as expanded
    },
    generatePrice() {
      return (Math.random() * 500 + 500).toFixed(2); // Random price between ₹500 and ₹1000
    },
    openLink(url) {
      window.open(url, "_blank");
    },
    toggleMenu(idx) {
      this.activeMenu = this.activeMenu === idx ? null : idx; // Toggle menu visibility
    },
    getCardBorderColor(index) {
      return this.borderColors[index % this.borderColors.length]; // Cycle through border colors
    },
    getCardBackgroundColor(index) {
      return this.backgroundColors[index % this.backgroundColors.length]; // Cycle through background colors
    },

    // Slider Methods
    moveToNext() {
      this.activeIndex = (this.activeIndex === this.cards.length - 1) ? 0 : this.activeIndex + 1;
    },

    moveToPrevious() {
      this.activeIndex = (this.activeIndex === 0) ? this.cards.length - 1 : this.activeIndex - 1;
    },

    toggleSlider() {
      if (this.sliderDirection === 'next') {
        this.moveToNext();
      } else {
        this.moveToPrevious();
      }
    },

    moveToCard(index) {
      this.activeIndex = index;
    },

    bulletStyle(index) {
      return {
        width: '10px',
        height: '10px',
        margin: '0 5px',
        borderRadius: '50%',
        backgroundColor: this.activeIndex === index ? '#01818C' : '#ccc',
        cursor: 'pointer'
      };
    }
  },
  mounted() {
    // Fetch TV shows for predefined words
    const words = ["cars", "action", "adventure"];
    words.forEach(word => this.fetchShows(word));

    // Handle submit button functionality
    document.getElementById('submitButton').addEventListener('click', function() {
      // Show success message
      document.getElementById('successMessage').classList.add('show');
      
      // Optionally, hide it after a few seconds
      setTimeout(function() {
        document.getElementById('successMessage').classList.remove('show');
      }, 3000); // Hide message after 3 seconds
    });
  }
});