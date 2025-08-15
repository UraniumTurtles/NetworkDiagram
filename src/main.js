// filepath: network-diagram-app/network-diagram-app/src/main.js
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    root.innerHTML = `
    <svg width="700" height="400">
      <!-- Firewall -->
      <rect x="300" y="40" width="100" height="40" fill="#f8c471" stroke="#333" stroke-width="2"/>
      <text x="350" y="65" text-anchor="middle" font-size="16">Firewall</text>
      
      <!-- Switches -->
      <rect x="180" y="120" width="100" height="40" fill="#aed6f1" stroke="#333" stroke-width="2"/>
      <text x="230" y="145" text-anchor="middle" font-size="16">Switch 1</text>
      <rect x="420" y="120" width="100" height="40" fill="#aed6f1" stroke="#333" stroke-width="2"/>
      <text x="470" y="145" text-anchor="middle" font-size="16">Switch 2</text>
      
      <!-- APs -->
      <ellipse cx="130" cy="220" rx="40" ry="25" fill="#abebc6" stroke="#333" stroke-width="2"/>
      <text x="130" y="225" text-anchor="middle" font-size="14">AP 1</text>
      <ellipse cx="230" cy="220" rx="40" ry="25" fill="#abebc6" stroke="#333" stroke-width="2"/>
      <text x="230" y="225" text-anchor="middle" font-size="14">AP 2</text>
      <ellipse cx="470" cy="220" rx="40" ry="25" fill="#abebc6" stroke="#333" stroke-width="2"/>
      <text x="470" y="225" text-anchor="middle" font-size="14">AP 3</text>
      <ellipse cx="570" cy="220" rx="40" ry="25" fill="#abebc6" stroke="#333" stroke-width="2"/>
      <text x="570" y="225" text-anchor="middle" font-size="14">AP 4</text>
      
      <!-- Connections -->
      <line x1="350" y1="80" x2="230" y2="120" stroke="#333" stroke-width="2"/>
      <line x1="350" y1="80" x2="470" y2="120" stroke="#333" stroke-width="2"/>
      <line x1="230" y1="160" x2="130" y2="195" stroke="#333" stroke-width="2"/>
      <line x1="230" y1="160" x2="230" y2="195" stroke="#333" stroke-width="2"/>
      <line x1="470" y1="160" x2="470" y2="195" stroke="#333" stroke-width="2"/>
      <line x1="470" y1="160" x2="570" y2="195" stroke="#333" stroke-width="2"/>
    </svg>
    `;
});