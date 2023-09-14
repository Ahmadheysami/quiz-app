const splashScreen = `
<!-- START => Splash Screen -->

<div class="splash-screen">
  <svg width="300" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"></circle>
      <circle fill="#fff" stroke="var(--primary)" stroke-width="3" cx="8" cy="54" r="6">
        <animateTransform attributeName="transform" dur="1s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite"></animateTransform>
      </circle>
    </svg>
    <h1>
      Quizz App
    </h1>
</div>

<!-- END => Splash Screen -->

`;

let loading = `
<div class="loading">
<svg width="200" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"></circle>
    <circle fill="#fff" stroke="var(--primary)" stroke-width="3" cx="8" cy="54" r="6">
      <animateTransform attributeName="transform" dur="1s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite"></animateTransform>
    </circle>
  </svg>
  <h1>Loading...</h1>
</div>
`;

export { splashScreen, loading };
