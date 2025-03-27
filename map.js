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

// 初始化地圖
document.addEventListener('DOMContentLoaded', function() {
    // 設定地圖中心點為瑪黑區
    const map = L.map('mapContainer').setView([48.8566, 2.3522], 14);

    // 使用 OpenStreetMap 圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

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
    maraisLocations.forEach(location => {
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
                <div><span style="color: red;">●</span> 瑪黑區景點</div>
                <div><span style="color: blue;">●</span> 周邊景點</div>
                <div style="color: red; border: 1px solid red; display: inline-block; width: 20px; height: 10px;"></div> 瑪黑區範圍
            </div>
        `;
        return div;
    };
    legend.addTo(map);
}); 