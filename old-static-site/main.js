import networkData from './data/networkData.js';

const state = {
    view: 'areas',
    areaId: null,
    clientId: null,
    locationId: null
};

const root = document.getElementById('root');

// URL routing functions
function parseUrlHash() {
    const hash = window.location.hash.slice(1); // Remove leading #
    if (!hash || hash === '/') {
        return { view: 'areas', areaId: null, clientId: null, locationId: null };
    }

    const parts = hash.split('/').filter(Boolean);

    if (parts.length === 1) {
        // #/area-id
        return { view: 'clients', areaId: parts[0], clientId: null, locationId: null };
    } else if (parts.length === 2) {
        // #/area-id/client-id
        return { view: 'locations', areaId: parts[0], clientId: parts[1], locationId: null };
    } else if (parts.length >= 3) {
        // #/area-id/client-id/location-id
        return { view: 'diagram', areaId: parts[0], clientId: parts[1], locationId: parts[2] };
    }

    return { view: 'areas', areaId: null, clientId: null, locationId: null };
}

function updateUrlHash() {
    let hash = '';

    if (state.view === 'areas') {
        hash = '/';
    } else if (state.view === 'clients' && state.areaId) {
        hash = `/${state.areaId}`;
    } else if (state.view === 'locations' && state.areaId && state.clientId) {
        hash = `/${state.areaId}/${state.clientId}`;
    } else if (state.view === 'diagram' && state.areaId && state.clientId && state.locationId) {
        hash = `/${state.areaId}/${state.clientId}/${state.locationId}`;
    }

    if (window.location.hash !== '#' + hash) {
        window.location.hash = hash;
    }
}

function validateAndSetState(parsedState) {
    // Validate that the IDs in the URL actually exist in the data
    if (parsedState.view === 'areas') {
        Object.assign(state, parsedState);
        return true;
    }

    const area = networkData.areas.find(a => a.id === parsedState.areaId);
    if (!area) {
        // Invalid area ID, fallback to areas view
        state.view = 'areas';
        state.areaId = null;
        state.clientId = null;
        state.locationId = null;
        return false;
    }

    if (parsedState.view === 'clients') {
        Object.assign(state, parsedState);
        return true;
    }

    const client = area.clients.find(c => c.id === parsedState.clientId);
    if (!client) {
        // Invalid client ID, fallback to clients view
        state.view = 'clients';
        state.areaId = parsedState.areaId;
        state.clientId = null;
        state.locationId = null;
        return false;
    }

    if (parsedState.view === 'locations') {
        Object.assign(state, parsedState);
        return true;
    }

    const location = client.locations.find(l => l.id === parsedState.locationId);
    if (!location) {
        // Invalid location ID, fallback to locations view
        state.view = 'locations';
        state.areaId = parsedState.areaId;
        state.clientId = parsedState.clientId;
        state.locationId = null;
        return false;
    }

    Object.assign(state, parsedState);
    return true;
}

const legendConfig = [
    { label: 'Firewall', color: 'rgba(255, 166, 58, 0.45)' },
    { label: 'Switch', color: 'rgba(47, 111, 237, 0.35)' },
    { label: 'Hypervisor Host', color: 'rgba(0, 172, 193, 0.35)' },
    { label: 'Access Point', color: 'rgba(46, 204, 113, 0.35)' }
];

const diagramDefaults = {
    size: { width: 960, height: 560 },
    firewalls: [],
    switches: [],
    hosts: [],
    accessPoints: [],
    links: []
};

function initializeApp() {
    if (!root) {
        console.error('Root container not found.');
        return;
    }

    // Initialize state from URL hash
    const parsedState = parseUrlHash();
    validateAndSetState(parsedState);

    // Listen for browser back/forward navigation
    window.addEventListener('hashchange', () => {
        const parsedState = parseUrlHash();
        validateAndSetState(parsedState);
        renderView();
    });

    renderView();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function renderView() {
    if (!root) {
        return;
    }

    root.innerHTML = '';

    // Update URL hash to match current state
    updateUrlHash();

    switch (state.view) {
        case 'areas':
            renderAreaSelection();
            break;
        case 'clients':
            renderClientSelection();
            break;
        case 'locations':
            renderLocationSelection();
            break;
        case 'diagram':
            renderDiagram();
            break;
        default:
            renderAreaSelection();
    }
}

function renderAreaSelection() {
    const header = createHeader({
        title: 'Network Diagram Explorer',
        subtitle: 'Start by selecting an operational area to drill into clients and site-specific network diagrams.'
    });

    const card = createCard();
    const intro = document.createElement('p');
    intro.textContent = 'Each area contains clients with one or more locations. Choose an area to explore the underlying network topology and virtualization assets.';
    card.appendChild(intro);

    const grid = document.createElement('div');
    grid.className = 'button-grid';

    const areas = Array.isArray(networkData?.areas) ? networkData.areas : [];

    if (areas.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No areas have been configured yet. Add markets to data/networkData.js to begin.';
        card.appendChild(empty);
    } else {
        areas.forEach(area => {
            const clientCount = area.clients?.length ?? 0;
            const option = createOptionCard({
                title: area.name,
                subtitle: area.description,
                meta: `${clientCount} client${clientCount === 1 ? '' : 's'}`,
                onClick: () => {
                    state.view = 'clients';
                    state.areaId = area.id;
                    state.clientId = null;
                    state.locationId = null;
                    renderView();
                }
            });
            grid.appendChild(option);
        });

        card.appendChild(grid);
    }

    root.appendChild(header);
    root.appendChild(card);
}

function renderClientSelection() {
    const area = getSelectedArea();
    if (!area) {
        goToAreas();
        return;
    }

    const header = createHeader({
        title: area.name,
        subtitle: area.description,
        breadcrumbs: [
            { label: 'Areas', onClick: goToAreas },
            { label: area.name }
        ],
        onBack: goToAreas
    });

    const card = createCard();
    const lead = document.createElement('p');
    lead.textContent = 'Select a client to review their locations and visualize the complete network footprint.';
    card.appendChild(lead);

    const grid = document.createElement('div');
    grid.className = 'button-grid';

    const noResultsMsg = document.createElement('p');
    noResultsMsg.textContent = 'No clients match your search.';
    noResultsMsg.style.display = 'none';
    noResultsMsg.className = 'no-results-message';

    if (!area.clients || area.clients.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No clients have been configured for this area yet.';
        card.appendChild(empty);
    } else {
        // Add search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';

        const searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.placeholder = 'Search clients...';
        searchInput.className = 'search-input';
        searchContainer.appendChild(searchInput);
        card.appendChild(searchContainer);

        area.clients.forEach(client => {
            const locationCount = client.locations?.length ?? 0;
            const option = createOptionCard({
                title: client.name,
                subtitle: client.summary,
                meta: `${locationCount} location${locationCount === 1 ? '' : 's'}`,
                onClick: () => {
                    state.view = 'locations';
                    state.clientId = client.id;
                    state.locationId = null;
                    renderView();
                }
            });
            option.dataset.searchText = `${client.name} ${client.summary}`.toLowerCase();
            grid.appendChild(option);
        });

        card.appendChild(grid);
        card.appendChild(noResultsMsg);

        // Add search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            grid.querySelectorAll('.option-card').forEach(option => {
                const searchText = option.dataset.searchText || '';
                if (searchText.includes(searchTerm)) {
                    option.style.display = '';
                    visibleCount++;
                } else {
                    option.style.display = 'none';
                }
            });

            noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        });
    }

    root.appendChild(header);
    root.appendChild(card);
}

function renderLocationSelection() {
    const area = getSelectedArea();
    const client = getSelectedClient();

    if (!area || !client) {
        if (!area) {
            goToAreas();
        } else {
            state.view = 'clients';
            renderView();
        }
        return;
    }

    const header = createHeader({
        title: client.name,
        subtitle: client.summary,
        breadcrumbs: [
            { label: 'Areas', onClick: goToAreas },
            { label: area.name, onClick: () => {
                state.view = 'clients';
                renderView();
            } },
            { label: client.name }
        ],
        onBack: () => {
            state.view = 'clients';
            renderView();
        }
    });

    const card = createCard();
    const lead = document.createElement('p');
    lead.textContent = 'Choose a location to open its detailed network diagram including connectivity, wireless coverage, and virtualization inventory.';
    card.appendChild(lead);

    const grid = document.createElement('div');
    grid.className = 'button-grid';

    const noResultsMsg = document.createElement('p');
    noResultsMsg.textContent = 'No locations match your search.';
    noResultsMsg.style.display = 'none';
    noResultsMsg.className = 'no-results-message';

    if (!client.locations || client.locations.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No locations are configured for this client yet.';
        card.appendChild(empty);
    } else {
        // Add search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';

        const searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.placeholder = 'Search locations...';
        searchInput.className = 'search-input';
        searchContainer.appendChild(searchInput);
        card.appendChild(searchContainer);

        client.locations.forEach(location => {
            const option = createOptionCard({
                title: location.name,
                subtitle: location.description,
                meta: location.address ?? '',
                onClick: () => {
                    state.view = 'diagram';
                    state.locationId = location.id;
                    renderView();
                }
            });
            option.dataset.searchText = `${location.name} ${location.description} ${location.address || ''}`.toLowerCase();
            grid.appendChild(option);
        });

        card.appendChild(grid);
        card.appendChild(noResultsMsg);

        // Add search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            grid.querySelectorAll('.option-card').forEach(option => {
                const searchText = option.dataset.searchText || '';
                if (searchText.includes(searchTerm)) {
                    option.style.display = '';
                    visibleCount++;
                } else {
                    option.style.display = 'none';
                }
            });

            noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        });
    }

    root.appendChild(header);
    root.appendChild(card);
}

function renderDiagram() {
    const area = getSelectedArea();
    const client = getSelectedClient();
    const location = getSelectedLocation();

    if (!area || !client || !location) {
        if (!area) {
            goToAreas();
        } else if (!client) {
            state.view = 'clients';
            renderView();
        } else {
            state.view = 'locations';
            renderView();
        }
        return;
    }

    const header = createHeader({
        title: location.name,
        subtitle: location.description ?? '',
        breadcrumbs: [
            { label: 'Areas', onClick: goToAreas },
            { label: area.name, onClick: () => {
                state.view = 'clients';
                renderView();
            } },
            { label: client.name, onClick: () => {
                state.view = 'locations';
                renderView();
            } },
            { label: location.name }
        ],
        onBack: () => {
            state.view = 'locations';
            renderView();
        }
    });

    const summaryCard = createCard();
    summaryCard.classList.add('location-summary');

    const summaryHeading = document.createElement('h2');
    summaryHeading.textContent = `${client.name} — ${location.name}`;
    summaryCard.appendChild(summaryHeading);

    if (location.address) {
        const address = document.createElement('p');
        address.innerHTML = `<strong>Address:</strong> ${escapeHtml(location.address)}`;
        summaryCard.appendChild(address);
    }

    if (location.description) {
        const description = document.createElement('p');
        description.textContent = location.description;
        summaryCard.appendChild(description);
    }

    const diagramLayout = document.createElement('div');
    diagramLayout.className = 'diagram-layout';

    const diagramCard = document.createElement('div');
    diagramCard.className = 'content-card diagram-card';

    const diagramHeader = document.createElement('div');
    diagramHeader.className = 'diagram-header';

    const diagramTitle = document.createElement('h2');
    diagramTitle.textContent = 'Network Topology';
    diagramHeader.appendChild(diagramTitle);

    const diagramSub = document.createElement('p');
    diagramSub.textContent = 'Visual representation of firewalls, switching, wireless, and hypervisor infrastructure.';
    diagramHeader.appendChild(diagramSub);

    diagramCard.appendChild(diagramHeader);

    const canvas = document.createElement('div');
    canvas.className = 'diagram-canvas';
    canvas.innerHTML = buildDiagramSVG(location.diagram);
    diagramCard.appendChild(canvas);
    diagramCard.appendChild(createLegend());

    // Add click handlers for mobile devices to toggle device-meta visibility
    addDeviceClickHandlers(canvas);

    diagramLayout.appendChild(diagramCard);

    const vmPanel = createVmPanel(location.diagram?.hosts ?? []);
    diagramLayout.appendChild(vmPanel);

    root.appendChild(header);
    root.appendChild(summaryCard);
    root.appendChild(diagramLayout);
}

function createHeader({ title, subtitle, breadcrumbs, onBack }) {
    const container = document.createElement('div');
    container.className = 'view-header';

    if (onBack) {
        container.appendChild(createBackButton(onBack));
    }

    const headingGroup = document.createElement('div');
    headingGroup.className = 'heading-group';

    const heading = document.createElement('h1');
    heading.textContent = title;
    headingGroup.appendChild(heading);

    if (subtitle) {
        const sub = document.createElement('p');
        sub.textContent = subtitle;
        headingGroup.appendChild(sub);
    }

    container.appendChild(headingGroup);

    if (breadcrumbs && breadcrumbs.length > 0) {
        container.appendChild(createBreadcrumbs(breadcrumbs));
    }

    return container;
}

function createBreadcrumbs(trail) {
    const nav = document.createElement('nav');
    nav.className = 'breadcrumbs';
    nav.setAttribute('aria-label', 'Breadcrumb');

    trail.forEach((item, index) => {
        if (item.onClick && index !== trail.length - 1) {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = item.label;
            button.addEventListener('click', item.onClick);
            nav.appendChild(button);
        } else {
            const span = document.createElement('span');
            span.textContent = item.label;
            nav.appendChild(span);
        }

        if (index < trail.length - 1) {
            const divider = document.createElement('span');
            divider.textContent = '/';
            nav.appendChild(divider);
        }
    });

    return nav;
}

function createOptionCard({ title, subtitle, meta, onClick }) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-card';
    button.addEventListener('click', onClick);

    const heading = document.createElement('strong');
    heading.textContent = title;
    button.appendChild(heading);

    if (subtitle) {
        const sub = document.createElement('p');
        sub.textContent = subtitle;
        button.appendChild(sub);
    }

    if (meta) {
        const metaSpan = document.createElement('span');
        metaSpan.className = 'option-card-meta';
        metaSpan.textContent = meta;
        button.appendChild(metaSpan);
    }

    return button;
}

function createCard() {
    const card = document.createElement('div');
    card.className = 'content-card';
    return card;
}

function createBackButton(onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-button';
    button.textContent = '← Back';
    button.addEventListener('click', onClick);
    return button;
}

function createLegend() {
    const legend = document.createElement('div');
    legend.className = 'diagram-legend';

    legendConfig.forEach(item => {
        const entry = document.createElement('span');
        entry.className = 'legend-item';

        const swatch = document.createElement('span');
        swatch.className = 'legend-swatch';
        swatch.style.background = item.color;

        entry.appendChild(swatch);
        entry.appendChild(document.createTextNode(item.label));
        legend.appendChild(entry);
    });

    return legend;
}

function createVmPanel(hosts) {
    const panel = document.createElement('div');
    panel.className = 'content-card vm-panel';

    const heading = document.createElement('h3');
    heading.textContent = 'Virtual Machines';
    panel.appendChild(heading);

    if (!hosts || hosts.length === 0) {
        const placeholder = document.createElement('p');
        placeholder.className = 'vm-placeholder';
        placeholder.textContent = 'No hypervisor hosts configured for this location.';
        panel.appendChild(placeholder);
        return panel;
    }

    hosts.forEach(host => {
        const hostContainer = document.createElement('div');
        hostContainer.className = 'vm-host';

        const hostHeader = document.createElement('div');
        hostHeader.className = 'vm-host-header';

        const hostName = document.createElement('span');
        hostName.className = 'vm-host-name';
        hostName.textContent = host.name;

        const hostMeta = document.createElement('span');
        hostMeta.className = 'vm-host-meta';
        hostMeta.textContent = [host.model, host.ip].filter(Boolean).join(' • ');

        hostHeader.appendChild(hostName);
        hostHeader.appendChild(hostMeta);

        hostContainer.appendChild(hostHeader);

        if (host.vms && host.vms.length > 0) {
            const list = document.createElement('ul');
            list.className = 'vm-list';

            host.vms.forEach(vm => {
                const item = document.createElement('li');
                const vmDetails = [vm.name, vm.role, vm.os, vm.ip].filter(Boolean);
                item.textContent = vmDetails.join(' • ');
                list.appendChild(item);
            });

            hostContainer.appendChild(list);
        }

        panel.appendChild(hostContainer);
    });

    return panel;
}

function buildDiagramSVG(diagramConfig) {
    const config = { ...diagramDefaults, ...diagramConfig };

    const width = config.size?.width ?? diagramDefaults.size.width;
    const height = config.size?.height ?? diagramDefaults.size.height;

    const devicePositions = {
        firewalls: new Map(),
        switches: new Map(),
        hosts: new Map(),
        accessPoints: new Map()
    };

    const segments = [];

    const classMap = {
        firewalls: 'device-firewall',
        switches: 'device-switch',
        hosts: 'device-host',
        accessPoints: 'device-ap'
    };

    const rectDimensions = {
        firewalls: { width: 200, height: 48 },
        switches: { width: 220, height: 48 },
        hosts: { width: 180, height: 60 }
    };

    const ellipseDimensions = { rx: 48, ry: 28 };

    function addRectDevice(type, device) {
        const dims = rectDimensions[type];
        if (!dims || !device.position) {
            return;
        }

        const x = device.position.x - dims.width / 2;
        const y = device.position.y - dims.height / 2;
        const labelY = device.position.y + 6;
        const metaY = device.position.y + dims.height / 2 + 18;
        const meta = [device.model, device.serial, device.ip].filter(Boolean).join(' • ');

        const maxTextWidth = dims.width - 10; // 5px padding on each side

        segments.push(`
            <g class="device-group" data-type="${type}" data-id="${escapeHtml(device.id)}">
                <rect class="device ${classMap[type]}" x="${x}" y="${y}" width="${dims.width}" height="${dims.height}" rx="10" ry="10"></rect>
                <text class="device-label" x="${device.position.x}" y="${labelY}" text-anchor="middle" textLength="${maxTextWidth}" lengthAdjust="spacingAndGlyphs">${escapeHtml(device.name)}</text>
                ${meta ? `<text class="device-meta" x="${device.position.x}" y="${metaY}" text-anchor="middle">${escapeHtml(meta)}</text>` : ''}
            </g>
        `);

        devicePositions[type].set(device.id, { x: device.position.x, y: device.position.y, width: dims.width, height: dims.height, shape: 'rect' });
    }

    function addEllipseDevice(type, device) {
        if (!device.position) {
            return;
        }

        const labelY = device.position.y + 6;
        const metaY = device.position.y + ellipseDimensions.ry + 20;
        const meta = [device.model, device.serial, device.ip].filter(Boolean).join(' • ');

        segments.push(`
            <g class="device-group" data-type="${type}" data-id="${escapeHtml(device.id)}">
                <ellipse class="device ${classMap[type]}" cx="${device.position.x}" cy="${device.position.y}" rx="${ellipseDimensions.rx}" ry="${ellipseDimensions.ry}"></ellipse>
                <text class="device-label" x="${device.position.x}" y="${labelY}" text-anchor="middle">${escapeHtml(device.name)}</text>
                ${meta ? `<text class="device-meta" x="${device.position.x}" y="${metaY}" text-anchor="middle">${escapeHtml(meta)}</text>` : ''}
            </g>
        `);

        devicePositions[type].set(device.id, { x: device.position.x, y: device.position.y, rx: ellipseDimensions.rx, ry: ellipseDimensions.ry, shape: 'ellipse' });
    }

    (config.firewalls ?? []).forEach(device => addRectDevice('firewalls', device));
    (config.switches ?? []).forEach(device => addRectDevice('switches', device));
    (config.hosts ?? []).forEach(device => addRectDevice('hosts', device));
    (config.accessPoints ?? []).forEach(device => addEllipseDevice('accessPoints', device));

    function resolveAnchorPoint(node, other) {
        if (!node) {
            return null;
        }

        if (!other) {
            return { x: node.x, y: node.y };
        }

        const dx = other.x - node.x;
        const dy = other.y - node.y;

        if (node.shape === 'rect') {
            if (Math.abs(dy) >= Math.abs(dx)) {
                const direction = dy === 0 ? 1 : Math.sign(dy);
                return { x: node.x, y: node.y + direction * (node.height / 2) };
            }
            const direction = dx === 0 ? 1 : Math.sign(dx);
            return { x: node.x + direction * (node.width / 2), y: node.y };
        }

        if (node.shape === 'ellipse') {
            const angle = Math.atan2(dy, dx);
            return {
                x: node.x + node.rx * Math.cos(angle),
                y: node.y + node.ry * Math.sin(angle)
            };
        }

        return { x: node.x, y: node.y };
    }

    const linkSegments = [];
    (config.links ?? []).forEach(link => {
        const from = devicePositions[link.from?.type]?.get(link.from?.id);
        const to = devicePositions[link.to?.type]?.get(link.to?.id);

        if (!from || !to) {
            return;
        }

        const fromAnchor = resolveAnchorPoint(from, to);
        const toAnchor = resolveAnchorPoint(to, from);

        if (!fromAnchor || !toAnchor) {
            return;
        }

        linkSegments.push(`<line class="diagram-link" x1="${fromAnchor.x}" y1="${fromAnchor.y}" x2="${toAnchor.x}" y2="${toAnchor.y}" role="presentation" />`);

        // Add port labels for switches and firewalls
        const showFromPort = (link.from?.type === 'switches' || link.from?.type === 'firewalls') && link.from?.port;
        const showToPort = (link.to?.type === 'switches' || link.to?.type === 'firewalls') && link.to?.port;

        if (showFromPort || showToPort) {
            const midX = (fromAnchor.x + toAnchor.x) / 2;
            const midY = (fromAnchor.y + toAnchor.y) / 2;
            const dx = toAnchor.x - fromAnchor.x;
            const dy = toAnchor.y - fromAnchor.y;
            const angle = Math.atan2(dy, dx);

            // Offset distance from the line
            const offsetDist = 8;
            const offsetX = -Math.sin(angle) * offsetDist;
            const offsetY = Math.cos(angle) * offsetDist;

            if (showFromPort) {
                const fromLabelX = fromAnchor.x + (midX - fromAnchor.x) * 0.3 + offsetX;
                const fromLabelY = fromAnchor.y + (midY - fromAnchor.y) * 0.3 + offsetY;
                linkSegments.push(`<text class="port-label" x="${fromLabelX}" y="${fromLabelY}" text-anchor="middle">${escapeHtml(link.from.port)}</text>`);
            }

            if (showToPort) {
                const toLabelX = toAnchor.x + (midX - toAnchor.x) * 0.3 + offsetX;
                const toLabelY = toAnchor.y + (midY - toAnchor.y) * 0.3 + offsetY;
                linkSegments.push(`<text class="port-label" x="${toLabelX}" y="${toLabelY}" text-anchor="middle">${escapeHtml(link.to.port)}</text>`);
            }
        }
    });

    return `
        <svg class="network-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Network diagram">
            <g class="connections" aria-hidden="true">${linkSegments.join('')}</g>
            <g class="devices">${segments.join('')}</g>
        </svg>
    `;
}

function buildTitle(device, type) {
    const lines = [device.name];

    if (device.model) {
        lines.push(`Model: ${device.model}`);
    }

    if (device.ip) {
        lines.push(`IP: ${device.ip}`);
    }

    if (type === 'hosts' && Array.isArray(device.vms) && device.vms.length > 0) {
        lines.push(`VMs: ${device.vms.map(vm => vm.name).join(', ')}`);
    }

    return lines.map(escapeHtml).join('&#10;');
}

function escapeHtml(value) {
    if (value == null) {
        return '';
    }

    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function addDeviceClickHandlers(canvas) {
    const deviceGroups = canvas.querySelectorAll('.device-group');
    const tooltip = document.createElement('div');
    tooltip.className = 'device-tooltip';
    canvas.style.position = 'relative';
    canvas.appendChild(tooltip);

    let activeDevice = null;

    function showTooltip(group, event) {
        const deviceType = group.dataset.type;
        const deviceId = group.dataset.id;

        // Get device data
        const metaText = group.querySelector('.device-meta');
        if (!metaText || !metaText.textContent.trim()) {
            hideTooltip();
            return;
        }

        tooltip.textContent = metaText.textContent;
        tooltip.classList.add('visible');

        // Position tooltip
        const svgElement = canvas.querySelector('.network-svg');
        const canvasRect = canvas.getBoundingClientRect();
        const svgRect = svgElement.getBoundingClientRect();

        let clientX, clientY;
        if (event.type === 'mousemove') {
            clientX = event.clientX;
            clientY = event.clientY;
        } else {
            // For click events, position above the device group
            const groupRect = group.getBoundingClientRect();
            clientX = groupRect.left + groupRect.width / 2;
            clientY = groupRect.top;
        }

        const x = clientX - canvasRect.left;
        const y = clientY - canvasRect.top - tooltip.offsetHeight - 12;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.transform = 'translateX(-50%)';
    }

    function hideTooltip() {
        tooltip.classList.remove('visible');
    }

    // Desktop hover behavior
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        deviceGroups.forEach(group => {
            group.addEventListener('mouseenter', (e) => {
                showTooltip(group, e);
            });

            group.addEventListener('mousemove', (e) => {
                if (tooltip.classList.contains('visible')) {
                    const canvasRect = canvas.getBoundingClientRect();
                    const x = e.clientX - canvasRect.left;
                    const y = e.clientY - canvasRect.top - tooltip.offsetHeight - 12;
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;
                }
            });

            group.addEventListener('mouseleave', hideTooltip);
        });
    }

    // Mobile/touch behavior
    deviceGroups.forEach(group => {
        group.style.cursor = 'pointer';

        group.addEventListener('click', (e) => {
            e.stopPropagation();

            if (activeDevice === group) {
                // Click same device - hide tooltip
                hideTooltip();
                activeDevice = null;
            } else {
                // Click different device - show tooltip
                activeDevice = group;
                showTooltip(group, e);
            }
        });
    });

    // Click anywhere else to hide tooltip
    canvas.addEventListener('click', (e) => {
        if (!e.target.closest('.device-group')) {
            hideTooltip();
            activeDevice = null;
        }
    });
}

function goToAreas() {
    state.view = 'areas';
    state.areaId = null;
    state.clientId = null;
    state.locationId = null;
    renderView();
}

function getSelectedArea() {
    return networkData.areas.find(area => area.id === state.areaId) ?? null;
}

function getSelectedClient() {
    const area = getSelectedArea();
    if (!area) {
        return null;
    }

    return area.clients.find(client => client.id === state.clientId) ?? null;
}

function getSelectedLocation() {
    const client = getSelectedClient();
    if (!client) {
        return null;
    }

    return client.locations.find(location => location.id === state.locationId) ?? null;
}

