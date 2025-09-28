/* eslint-disable no-undef */
// 旅遊規畫前端邏輯：負責呼叫後端、更新主目錄、同步 Google 地圖

const state = {
    map: null,
    infoWindow: null,
    markers: [],
    lodgingMarker: null,
    lastResponse: null
};

const form = document.querySelector('#planner-form');
const statusMessage = document.querySelector('#status-message');
const directoryList = document.querySelector('#directory-list');
const downloadContainer = document.querySelector('#download-links');
const downloadJsonLink = document.querySelector('#download-json');
const downloadCsvLink = document.querySelector('#download-csv');
const resetButton = document.querySelector('#reset-btn');

function setStatus(message, tone = 'info') {
    statusMessage.textContent = message;
    statusMessage.dataset.tone = tone;
}

function clearMarkers() {
    state.markers.forEach((marker) => marker.setMap(null));
    state.markers = [];
    if (state.infoWindow) {
        state.infoWindow.close();
    }
}

// 建立地圖並標出預設區域
function initMap() {
    state.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.8566, lng: 2.3522 },
        zoom: 13,
        mapId: 'DEMO_MAP_ID'
    });
    state.infoWindow = new google.maps.InfoWindow({ maxWidth: 320 });
}

window.initPlannerMap = initMap;

function focusOnLocation(coords, title) {
    if (!coords) return;
    state.map.panTo(coords);
    state.map.setZoom(14);
    setStatus(`已聚焦：${title}`, 'success');
}

function renderDirectory(attractions) {
    if (!attractions.length) {
        directoryList.innerHTML = '<p>暫無景點資料。請重新搜尋。</p>';
        return;
    }

    const fragment = document.createDocumentFragment();

    attractions.forEach((item, index) => {
        const wrapper = document.createElement('article');
        wrapper.className = 'directory-item';

        const heading = document.createElement('h3');
        heading.textContent = `${index + 1}. ${item.name}`;
        wrapper.appendChild(heading);

        const description = document.createElement('p');
        description.textContent = item.description;
        wrapper.appendChild(description);

        if (item.address) {
            const address = document.createElement('p');
            address.textContent = `地址：${item.address}`;
            wrapper.appendChild(address);
        }

        const meta = [];
        if (typeof item.distance_km === 'number') {
            meta.push(`距離：${item.distance_km} 公里`);
        }
        if (Array.isArray(item.categories) && item.categories.length) {
            meta.push(`分類：${item.categories.join(' / ')}`);
        }
        if (meta.length) {
            const metaP = document.createElement('p');
            metaP.textContent = meta.join(' · ');
            wrapper.appendChild(metaP);
        }

        if (item.source_url) {
            const link = document.createElement('a');
            link.href = item.source_url;
            link.target = '_blank';
            link.rel = 'noopener';
            link.textContent = '查看來源';
            wrapper.appendChild(link);
        }

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = '在地圖上查看';
        btn.addEventListener('click', () => {
            if (!item.lat || !item.lng) {
                setStatus('此景點缺少座標資料，無法在地圖上顯示。', 'warning');
                return;
            }
            focusOnLocation({ lat: item.lat, lng: item.lng }, item.name);
        });
        wrapper.appendChild(btn);

        fragment.appendChild(wrapper);
    });

    directoryList.innerHTML = '';
    directoryList.appendChild(fragment);
}

function addMarkers(attractions, lodging) {
    clearMarkers();

    if (lodging.lat && lodging.lng) {
        state.lodgingMarker = new google.maps.Marker({
            map: state.map,
            position: { lat: lodging.lat, lng: lodging.lng },
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            },
            title: '住宿位置'
        });
        state.markers.push(state.lodgingMarker);
    }

    attractions.forEach((item) => {
        if (!item.lat || !item.lng) return;

        const marker = new google.maps.Marker({
            map: state.map,
            position: { lat: item.lat, lng: item.lng },
            title: item.name,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
        });

        marker.addListener('click', () => {
            const categories = Array.isArray(item.categories) ? item.categories.join(' / ') : '';
            const content = `
                <div class="map-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    ${item.address ? `<p><strong>地址：</strong>${item.address}</p>` : ''}
                    ${categories ? `<p><strong>分類：</strong>${categories}</p>` : ''}
                    ${typeof item.distance_km === 'number' ? `<p><strong>距離住宿：</strong>${item.distance_km} 公里</p>` : ''}
                    ${item.source_url ? `<a href="${item.source_url}" target="_blank" rel="noopener">相關資訊</a>` : ''}
                </div>
            `;
            state.infoWindow.setContent(content);
            state.infoWindow.open({ anchor: marker, map: state.map });
        });

        state.markers.push(marker);
    });

    if (state.markers.length) {
        const bounds = new google.maps.LatLngBounds();
        state.markers.forEach((marker) => {
            bounds.extend(marker.getPosition());
        });
        state.map.fitBounds(bounds);
    }
}

function createDownloadLinks(response) {
    const jsonBlob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
    const csvBlob = new Blob([toCSV(response)], { type: 'text/csv;charset=utf-8;' });

    downloadJsonLink.href = URL.createObjectURL(jsonBlob);
    downloadJsonLink.download = `travel_plan_${Date.now()}.json`;

    downloadCsvLink.href = URL.createObjectURL(csvBlob);
    downloadCsvLink.download = `travel_plan_${Date.now()}.csv`;

    downloadContainer.hidden = false;
}

function toCSV(response) {
    if (!response.attractions || !response.attractions.length) {
        return 'name,description,address,lat,lng,distance_km,categories,source\n';
    }
    const header = 'name,description,address,lat,lng,distance_km,categories,source\n';
    const rows = response.attractions.map((item) => {
        const values = [
            item.name,
            item.description,
            item.address || '',
            item.lat ?? '',
            item.lng ?? '',
            item.distance_km ?? '',
            Array.isArray(item.categories) ? item.categories.join('|') : '',
            item.source_url || ''
        ].map((value) => {
            if (value === null || value === undefined) return '';
            const str = String(value).replace(/"/g, '""');
            return `"${str}"`;
        });
        return values.join(',');
    });
    return header + rows.join('\n');
}

async function fetchAttractions(payload) {
    const response = await fetch('/api/attractions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || '取得景點資料失敗');
    }

    return response.json();
}

function buildPayload() {
    const destination = form.destination.value.trim();
    const lodging = form.lodging_address.value.trim();
    const start = form.start_date.value || null;
    const end = form.end_date.value || null;

    const payload = { destination, lodging_address: lodging };
    if (start || end) {
        payload.travel_dates = { start, end };
    }
    return payload;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = buildPayload();
    if (!payload.destination || !payload.lodging_address) {
        setStatus('請確認目的地與住宿地址皆已填寫。', 'warning');
        return;
    }

    try {
        setStatus('正在呼叫 browser_agents 進行搜尋，請稍候...', 'info');
        form.classList.add('is-loading');
        const response = await fetchAttractions(payload);
        state.lastResponse = response;

        renderDirectory(response.attractions);
        addMarkers(response.attractions, response.lodging);
        createDownloadLinks(response);
        setStatus(`搜尋完成，共取得 ${response.meta.result_count} 筆景點資料。`, 'success');
    } catch (error) {
        console.error(error);
        setStatus(`發生錯誤：${error.message}`, 'error');
    } finally {
        form.classList.remove('is-loading');
    }
});

resetButton.addEventListener('click', () => {
    directoryList.innerHTML = '<p>尚未載入資料。</p>';
    clearMarkers();
    downloadContainer.hidden = true;
    setStatus('已清除輸入內容。', 'info');
});

window.addEventListener('beforeunload', () => {
    if (downloadJsonLink.href.startsWith('blob:')) {
        URL.revokeObjectURL(downloadJsonLink.href);
    }
    if (downloadCsvLink.href.startsWith('blob:')) {
        URL.revokeObjectURL(downloadCsvLink.href);
    }
});
