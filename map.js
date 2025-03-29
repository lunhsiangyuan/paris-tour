// 瑪黑區主要景點資料
const maraisLocations = [
    {
        name: "孚日廣場 Place des Vosges",
        coords: [48.8559, 2.3654],
        description: "巴黎最古老的計劃廣場，17世紀建造的皇家廣場"
    },
    {
        name: "聖保祿聖路易教堂 Église Saint-Paul-Saint-Louis",
        coords: [48.8552, 2.3622],
        description: "17世紀巴洛克風格教堂，路易十四曾到訪"
    },
    {
        name: "卡納瓦雷博物館 Musée Carnavalet",
        coords: [48.8571, 2.3625],
        description: "巴黎歷史博物館，收藏豐富的城市發展史料"
    },
    {
        name: "法國國家檔案館 Archives Nationales",
        coords: [48.8586, 2.3594],
        description: "拿破崙時期設立的帝國檔案館"
    },
    {
        name: "紅孩兒市集 Marché des Enfants Rouges",
        coords: [48.8632, 2.3624],
        description: "巴黎最古老的市集，多元美食薈萃"
    }
];

// 周邊景點資料
const surroundingLocations = [
    {
        name: "盧浮宮 Musée du Louvre",
        coords: [48.8606, 2.3376],
        description: "世界最大的藝術博物館"
    },
    {
        name: "龐畢度中心 Centre Pompidou",
        coords: [48.8607, 2.3522],
        description: "現代藝術博物館與文化中心"
    },
    {
        name: "旺多姆廣場 Place Vendôme",
        coords: [48.8677, 2.3297],
        description: "奢華購物區，拿破崙紀念柱所在地"
    }
];

// 景點資料
const spots = [
    {
        name: 'Place des Vosges',
        category: 'landmark',
        coords: [48.8559, 2.3652],
        description: '巴黎最古老的計劃廣場，建於1605年',
        address: 'Place des Vosges, 75004',
        time: '全天開放'
    },
    {
        name: 'Musée Carnavalet',
        category: 'museum',
        coords: [48.8574, 2.3624],
        description: '巴黎歷史博物館',
        address: '23 Rue de Sévigné, 75003',
        time: '週二-週日 10:00-18:00'
    },
    {
        name: 'L\'As du Fallafel',
        category: 'food',
        coords: [48.8578, 2.3625],
        description: '著名的猶太餐廳',
        address: '34 Rue des Rosiers, 75004',
        time: '週日-週五 11:00-23:00',
        rating: 4.5
    },
    {
        name: 'Chez Janou',
        category: 'food',
        coords: [48.8586, 2.3666],
        description: '普羅旺斯風格餐廳',
        address: '2 Rue Roger Verlomme, 75003',
        time: '每日 12:00-15:00, 19:00-23:00',
        rating: 4.4
    },
    {
        name: 'Breizh Café',
        category: 'food',
        coords: [48.8613, 2.3622],
        description: '高級可麗餅餐廳',
        address: '109 Rue Vieille du Temple, 75003',
        time: '週二-週日 11:30-23:00',
        rating: 4.6
    },
    {
        name: 'Musée Picasso',
        category: 'museum',
        coords: [48.8598, 2.3622],
        description: '畢卡索藝術博物館',
        address: '5 Rue de Thorigny, 75003',
        time: '週二-週日 10:30-18:00'
    },
    {
        name: 'L\'Ami Louis',
        category: 'food',
        coords: [48.8647, 2.3662],
        description: '傳統法式餐廳，以烤雞聞名',
        address: '32 Rue du Vertbois, 75003',
        time: '週二-週日 12:00-14:30, 19:00-23:00',
        rating: 4.4
    },
    {
        name: 'Derrière',
        category: 'food',
        coords: [48.8628, 2.3617],
        description: '時尚法式餐廳，室內設計獨特',
        address: '69 Rue des Gravilliers, 75003',
        time: '每日 12:00-14:30, 20:00-23:30',
        rating: 4.3
    },
    {
        name: 'Chez L\'Ami Louis',
        category: 'food',
        coords: [48.8647, 2.3662],
        description: '經典法式小餐館',
        address: '32 Rue du Vertbois, 75003',
        time: '週二-週日 12:00-14:30, 19:00-23:00',
        rating: 4.4
    },
    {
        name: 'Bistrot Victoires',
        category: 'food',
        coords: [48.8665, 2.3403],
        description: '傳統法式小餐館',
        address: '6 Rue de la Vrillière, 75001',
        time: '週一-週五 12:00-15:00, 19:00-22:30',
        rating: 4.3
    },
    {
        name: 'Juveniles',
        category: 'food',
        coords: [48.8647, 2.3331],
        description: '法式美食酒吧',
        address: '47 Rue de Richelieu, 75001',
        time: '週二-週六 12:00-14:30, 19:00-22:30',
        rating: 4.5
    },
    {
        name: 'Pirouette',
        category: 'food',
        coords: [48.8644, 2.3474],
        description: '創意法式料理',
        address: '5 Rue Mondétour, 75001',
        time: '週二-週六 12:00-14:00, 19:30-22:00',
        rating: 4.6
    },
    {
        name: 'Frenchie',
        category: 'food',
        coords: [48.8668, 2.3478],
        description: '米其林星級餐廳',
        address: '5 Rue du Nil, 75002',
        time: '週三-週日 18:30-22:00',
        rating: 4.7
    },
    {
        name: 'Racines',
        category: 'food',
        coords: [48.8687, 2.3439],
        description: '意大利風味餐廳',
        address: '8 Passage des Panoramas, 75002',
        time: '週一-週五 12:00-14:30, 19:30-22:30',
        rating: 4.4
    },
    {
        name: 'A Noste',
        category: 'food',
        coords: [48.8701, 2.3428],
        description: '巴斯克地區美食',
        address: '6 Rue du 4 Septembre, 75002',
        time: '週一-週五 12:00-14:30, 19:00-22:30',
        rating: 4.3
    }
];

// 初始化地圖
let map = L.map('map').setView([48.8566, 2.3522], 15);

// 添加地圖圖層
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 定義不同類別的圖標
const icons = {
    landmark: 'monument',
    museum: 'palette',
    food: 'utensils'
};

// 添加標記
function addMarkers(filteredSpots = spots) {
    // 清除現有標記
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // 添加新標記
    filteredSpots.forEach(spot => {
        const marker = L.marker(spot.coords)
            .bindPopup(`
                <div class="popup-content">
                    <h3>${spot.name}</h3>
                    <p>${spot.description}</p>
                    <p><i class="fas fa-clock"></i> ${spot.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${spot.address}</p>
                    ${spot.rating ? `<p><i class="fas fa-star"></i> ${spot.rating}/5</p>` : ''}
                </div>
            `);
        marker.addTo(map);
    });
}

// 篩選功能
function filterSpots(category = 'all') {
    const filteredSpots = category === 'all' 
        ? spots 
        : spots.filter(spot => spot.category === category);
    addMarkers(filteredSpots);
}

// 初始化標記
addMarkers();

// 監聽篩選按鈕點擊事件
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        filterSpots(category);
        
        // 更新按鈕狀態
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// 自定義圖標
const maraisIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const surroundingIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// 添加瑪黑區景點標記
mairisLocations.forEach(location => {
    L.marker(location.coords, {icon: maraisIcon})
        .bindPopup(`<strong>${location.name}</strong><br>${location.description}`)
        .addTo(map);
});

// 添加周邊景點標記
surroundingLocations.forEach(location => {
    L.marker(location.coords, {icon: surroundingIcon})
        .bindPopup(`<strong>${location.name}</strong><br>${location.description}`)
        .addTo(map);
});

// 添加瑪黑區邊界
const maraisArea = L.polygon([
    [48.8520, 2.3580],
    [48.8620, 2.3580],
    [48.8620, 2.3680],
    [48.8520, 2.3680]
], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2
}).addTo(map);

// 添加圖例
const legend = L.control({position: 'bottomright'});
legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h4>圖例</h4>
            <div><span style="color: gold;">●</span> 我的住處</div>
            <div><span style="color: red;">●</span> 瑪黑區景點</div>
            <div><span style="color: blue;">●</span> 周邊景點</div>
            <div style="color: red; border: 1px solid red; display: inline-block; width: 20px; height: 10px;"></div> 瑪黑區範圍
        </div>
    `;
    return div;
};
legend.addTo(map);

const myHome = {
    name: '我的住處',
    coords: [48.8612, 2.3583], // 96 Rue des Archives 的座標
    description: '96 Rue des Archives',
    icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
};

// 添加住處標記（在 addMarkers 函數之前）
const homeMarker = L.marker(myHome.coords, {icon: myHome.icon})
    .bindPopup(`
        <div class="popup-content">
            <h3>${myHome.name}</h3>
            <p><i class="fas fa-home"></i> ${myHome.description}</p>
        </div>
    `)
    .addTo(map);

// 修改地圖初始視角以居中於住處
map.setView(myHome.coords, 15); 