import { BrewForm, StarRating } from '@brews';
import { If } from '@components';
import { useModal, useStore } from '@context';
import { formatDate, formatObject } from '@utils';
import { useState, useEffect } from 'react';
import './BrewListItem.css';

function BrewListItem({ brew:initialBrew, show, focusBrew }) {
    const [brew, setBrew] = useState(initialBrew);
    const [itemClass, setItemClass] = useState("brew-list-item");

    const { setOnModalClose, setModalContent } = useModal();
    const { fetchBrews } = useStore();
    
    // parsed grindSize and ratio (no trailing zeros)
    const pGrindSize = Number(brew.grindSize);
    const pRatio = Number(brew.ratio);
    const pDose = Number(brew.dose);
    const pWater = Number(brew.waterAmt);
    const pDate = formatDate(brew.date);

    useEffect(() => {
            if(show) {
                setItemClass("brew-list-item show");
            } else {
                setItemClass("brew-list-item");
            }
        }, [show]);

    const editBrew = () => {
        setModalContent(<BrewForm brewId={brew.id} />);
        setOnModalClose(() => () => {
            fetch(`/api/brews/${brew.id}`)
            .then(res => res.json())
            .then(data => formatObject(data))
            .then(data => setBrew(data))
        });
    }

    const deleteBrew = () => {
        fetch(`/api/brews/${brew.id}`,
            {
                method: 'DELETE'
            }
        ).then(res => {
            if(res.ok) fetchBrews();
        });
    }

    const showItem = () => focusBrew();

    return (
        <div className={itemClass} onTouchStart={showItem} onMouseOver={showItem}>
            <div className='brew-title'>
                <h3>{pDate}</h3>
                <div>
                    <h5><em>{brew.coffee.farm}</em></h5>
                    <p>{brew.coffee.roaster}</p>
                </div>
            </div>
            <div className='brew-content'>
                <If value={brew.grindSize && brew.grinder}>
                    <div className='grind-details'>
                        <svg className='grinder-icon' viewBox="422.049 149.34 1155.9 1701.32" xmlns="http://www.w3.org/2000/svg" fill='currentColor'><path d="M1463.43 149.34C1420.23 149.34 1372.28 151.586 1363.65 159.59C1354.75 167.844 1351.82 182.8 1351.99 209.34C1352.17 235.88 1360.53 263.397 1370.52 282.997C1380.52 302.596 1395.84 320.58 1399.77 341.372C1403.7 362.163 1407.09 406.153 1407.09 406.153C1407.09 406.153 1252.86 398.742 1208.52 398.715C1164.19 398.689 1031.62 400.321 1016.37 404.122C1000.76 408.009 976.791 420.327 958.273 432.809C939.754 445.291 898.129 466.734 874.367 471.715C850.604 476.697 767.679 483.622 767.679 483.622C767.679 483.622 769.495 444.489 728.179 439.934C694.025 436.169 662.558 434.661 639.023 444.809C616.223 454.64 614.575 470.812 614.742 481.309C614.909 491.807 616.617 520.059 616.617 520.059C616.617 520.059 546.884 522.439 521.585 525.09C496.602 527.709 439.212 540.86 429.523 546.059C422.05 550.069 421.683 555.212 422.21 561.903C423.069 572.801 437.102 692.632 446.554 739.122C457.364 792.293 498.333 919.688 506.992 992.059C515.664 1064.55 511.316 1173.57 503.929 1253.53C496.442 1334.58 487.76 1431.55 481.842 1513.83C476.246 1591.64 466.28 1775.7 467.385 1797.07C467.444 1798.23 467.697 1801.38 467.697 1801.38C467.697 1801.38 469.782 1808.71 480.361 1814.86C508.849 1831.44 569.397 1849.21 709.085 1850.59C843.063 1851.91 897.344 1834.16 933.273 1807.9C945.312 1799.1 948.054 1789.5 948.054 1789.5C948.054 1789.5 943.297 1603.06 934.742 1502.12C926.186 1401.18 914.078 1317.41 904.648 1242.53C898.266 1191.85 881.613 1066.97 892.648 975.559C900.874 907.408 934.59 800.014 946.742 728.715C958.993 656.831 966.896 549.791 966.273 544.965C965.645 540.1 959.044 536.116 954.242 534.309C937.78 528.116 896.075 520.892 855.242 518.653C801.49 515.705 769.773 516.778 769.773 516.778L769.742 511.684C769.742 511.684 853.57 504.476 879.679 498.184C916.349 489.347 925.529 482.052 944.46 471.622C963.392 461.191 992.423 438.872 1011.34 433.09C1030.25 427.309 1174.19 426.485 1217.87 427.497C1261.54 428.509 1407.62 434.309 1407.62 434.309C1407.62 434.309 1434.75 440.763 1460.55 440.747C1493.9 440.726 1512.86 431.376 1515.3 427.684C1517.59 424.228 1511.92 407.381 1513.59 387.028C1515.25 366.675 1525.71 331.267 1541.37 306.778C1557.02 282.288 1570.76 260.128 1574.87 233.559C1578.97 206.99 1580.26 165.75 1570.52 158.997C1560.27 151.892 1506.62 149.34 1463.43 149.34ZM880.657 1143.18L891.981 1251.64C891.981 1251.64 883.911 1257.66 875.367 1262.31C866.77 1266.98 867.508 1267.84 842.804 1273.84C814.621 1280.68 774.999 1285.53 697.929 1285.53C620.859 1285.53 557.839 1275.31 545.085 1272.68C532.757 1270.15 524.176 1267.05 517.977 1261.27C515.179 1258.67 515.289 1256.46 515.289 1256.46L521.289 1148.73C521.289 1148.73 523.806 1152.97 527.612 1156.25C533.48 1161.32 538.99 1163.17 556.71 1165.4C574.337 1167.62 626.017 1174.55 695.773 1174.53C765.529 1174.51 809.218 1170.77 835.742 1165.34C852.613 1161.89 858.379 1159.11 867.196 1153.04C875.731 1147.16 880.657 1143.18 880.657 1143.18Z"/></svg>
                        <div>
                            <p>{brew.grinder}</p>
                            <p>
                                setting&nbsp;
                                <b style={{fontWeight: "600", fontSize:"18px"}}>{pGrindSize}</b>
                                {/* <svg className='grind-size-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='currentColor' fillOpacity={.6}><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg> */}
                            </p>
                        </div>
                    </div>
                </If>
                <div className='brew-details'>
                    <div>{brew.brewer}</div>
                    <div className='coffee-water'>
                        <div>
                            <span>{pDose}g &nbsp;</span>
                            <svg className='coffee-icon' height="100%" version="1.1" viewBox="0 0 180 180" width="100%" fill='currentColor'><path d="M158.722 17.901C157.021 16.6015 153.055 16.1149 151.614 18.323C149.048 22.2548 148.517 26.1074 136.161 46.7811C123.264 68.3594 110.876 76.8848 85.8335 99.1835C61.009 121.288 42.7409 161.079 44.4821 172.784C44.7239 174.409 46.8151 176.809 48.3598 177.344C78.7194 184.948 117.5 170.971 145.623 139.164C181.014 99.1389 186.381 45.8448 158.722 17.901ZM141.054 5.82212C109.689-7.74567 65.5925 5.70712 34.4812 40.8931C-2.02254 82.1779-6.76678 137.643 23.9209 164.777C24.8877 165.632 25.9516 166.312 26.9644 167.091C28.5568 167.902 29.9422 166.436 30.5861 164.943C32.1301 161.366 30.8514 159.892 42.1346 136.651C62.9019 93.8719 91.3721 82.5488 109.5 63.295C126.995 44.7146 131.13 35.1941 142.159 9.88744C142.536 9.02342 142.612 6.72356 141.054 5.82212Z" /></svg>
                        </div>
                        <div>
                            <span>{pWater}g &nbsp;</span>
                            <svg className='water-drop-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill='currentColor'><path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/></svg>
                        </div>
                    </div>
                    <div>
                        <span>1</span>
                        <hr style={{margin: 0, padding: 0}}/>
                        <span>{pRatio}</span>
                    </div>
                    <div>
                        <If value={brew.water_temp}>
                            <span>{brew.water_temp}&deg;{brew.celsius ? "C" : "F"}</span>
                        </If>
                    </div>
                </div>
                <If value={brew.recipe || brew.notes}>
                    <div className='content-p'>
                    <If value={brew.recipe}>
                        <div className='recipe'>
                            <h6>Recipe</h6>
                            <p>{brew.recipe}</p>
                        </div>
                    </If>
                    <If value={brew.notes}>
                        <div className='notes'>
                            <h6>Notes</h6>
                            <p>{brew.notes}</p>
                        </div>
                    </If>
                    </div>
                </If>
                <StarRating rating={brew.rating} />

            </div>
            <div className='brew-buttons'>
                <button className='edit-brew-button' onClick={editBrew}>
                    <svg className='edit-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='currentColor'>
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                    </svg>
                </button>
                <button className='delete-brew-button' onClick={deleteBrew}>
                    <svg className='trash-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='currentColor'>
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </button>
            </div>

        </div>
    );
}

export default BrewListItem