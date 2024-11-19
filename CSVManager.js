// CSVManager.js

// CSVファイルを読み込む関数
async function loadCSVData(url) {
  const response = await fetch(url);
  const text = await response.text();
  const rows = text.split('\n').slice(1); // ヘッダーを除去

  const data = [];
  rows.forEach(row => {
    const cols = row.split(',');
    if (cols.length >= 3) {
      data.push({
        x: parseFloat(cols[0]),
        y: parseFloat(cols[1]),
        z: parseFloat(cols[2])
      });
    }
  });
  return data;
}

// データを0〜1の範囲に正規化する関数
function normalizeData(data) {
  let min = Infinity;
  let max = -Infinity;

  const centeredData = data.forEach(point => {
    const absX = Math.abs(point.x);
    const absY = Math.abs(point.y);
    const absZ = Math.abs(point.z);

    // 各軸の絶対値を比較し、一番大きいものをmaxに代入
    max = Math.max(max, absX, absY, absZ);
    min = Math.min(min, absX, absY, absZ);
  });

  // 正規化
  return data.map(point => ({
    x: (point.x - min) / (max - min),
    y: (point.y - min) / (max - min),
    z: (point.z - min) / (max - min)
  }));
}

export { loadCSVData, normalizeData };
