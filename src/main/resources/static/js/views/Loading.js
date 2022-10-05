export default function Loading(props) {
    return `
    <style>
    .loader {
        text-align: center;
        margin-top: 15%;
        margin-bottom: 20%;
      }
      
      .loader p {
        display: inline-block;
        text-transform: uppercase;
        text-align: center;
        font-size: 4em;
        font-family: arial;
        font-weight: 600;
        transform: scale(.5);
        color: #121212;
        -webkit-text-stroke: 2px gray;
      }
      
      .loader  p:nth-child(1) {
        animation: var(--effect);
      }
      
      .loader  p:nth-child(2) {
        animation: var(--effect) .125s;
      }
      
      .loader  p:nth-child(3) {
        animation: var(--effect) .25s;
      }
      
      .loader  p:nth-child(4) {
        animation: var(--effect) .375s;
      }
      
      .loader p:nth-child(5) {
        animation: var(--effect) .5s;
      }
      
      .loader  p:nth-child(6) {
        animation: var(--effect) .675s;
      }
      
      .loader  p:nth-child(7) {
        animation: var(--effect) .75s;
      }
    </style>
    <div class="loader">
    <p>l</p>
    <p>o</p>
    <p>a</p>
    <p>d</p>
    <p>i</p>
    <p>n</p>
    <p>g</p>
  </div>
  `;
}