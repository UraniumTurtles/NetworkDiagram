import networkData from './data/networkData.js';

const state = {
    view: 'areas',
    areaId: null,
    clientId: null,
    locationId: null
};

const root = document.getElementById('root');

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

    if (!area.clients || area.clients.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No clients have been configured for this area yet.';
        card.appendChild(empty);
    } else {
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
            grid.appendChild(option);
        });
        card.appendChild(grid);
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

    if (!client.locations || client.locations.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No locations are configured for this client yet.';
        card.appendChild(empty);
    } else {
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
            grid.appendChild(option);
        });
        card.appendChild(grid);
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

    diagramLayout.appendChild(diagramCard);

    const vmPanel = createVmPanel(location.diagram?.hosts ?? []);
    if (vmPanel) {
        diagramLayout.appendChild(vmPanel);
    }

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
    if (!hosts || hosts.length === 0) {
        return null;
    }

    const panel = document.createElement('div');
    panel.className = 'content-card vm-panel';

    const heading = document.createElement('h3');
    heading.textContent = 'Virtual Machines';
    panel.appendChild(heading);

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
        firewalls: { width: 140, height: 48 },
        switches: { width: 140, height: 48 },
        hosts: { width: 160, height: 60 }
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
        const meta = [device.model, device.ip].filter(Boolean).join(' • ');
        const title = buildTitle(device, type);

        segments.push(`
            <g class="device-group" data-type="${type}" data-id="${escapeHtml(device.id)}">
                <rect class="device ${classMap[type]}" x="${x}" y="${y}" width="${dims.width}" height="${dims.height}" rx="10" ry="10">
                    <title>${title}</title>
                </rect>
                <text class="device-label" x="${device.position.x}" y="${labelY}" text-anchor="middle">${escapeHtml(device.name)}</text>
                ${meta ? `<text class="device-meta" x="${device.position.x}" y="${metaY}" text-anchor="middle">${escapeHtml(meta)}</text>` : ''}
            </g>
        `);

        devicePositions[type].set(device.id, { x: device.position.x, y: device.position.y, width: dims.width, height: dims.height, shape: 'rect' });
    }

    function addEllipseDevice(type, device) {
        if (!device.position) {
            return;
        }

        const title = buildTitle(device, type);
        const labelY = device.position.y + 6;
        const metaY = device.position.y + ellipseDimensions.ry + 20;
        const meta = [device.model, device.ip].filter(Boolean).join(' • ');

        segments.push(`
            <g class="device-group" data-type="${type}" data-id="${escapeHtml(device.id)}">
                <ellipse class="device ${classMap[type]}" cx="${device.position.x}" cy="${device.position.y}" rx="${ellipseDimensions.rx}" ry="${ellipseDimensions.ry}">
                    <title>${title}</title>
                </ellipse>
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

