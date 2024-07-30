import React, { useEffect } from 'react';
import { useCustomization } from '../api/theme-context';

function ColorSettings() {
  const {
    backgroundColor,
    logoColor,
    topBarColor,
    sideBarColor,
    setBackgroundColor,
    setLogoColor,
    setTopBarColor,
    setSideBarColor,
  } = useCustomization();

  useEffect(() => {
    const logoHeaderColorButtons = document.querySelectorAll('.changeLogoHeaderColor');
    const topBarColorButtons = document.querySelectorAll('.changeTopBarColor');
    const sideBarColorButtons = document.querySelectorAll('.changeSideBarColor');

    logoHeaderColorButtons.forEach((button) => {
      if (button.getAttribute('data-color') === logoColor) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });

    topBarColorButtons.forEach((button) => {
      if (button.getAttribute('data-color') === topBarColor) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });

    sideBarColorButtons.forEach((button) => {
      if (button.getAttribute('data-color') === sideBarColor) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }, [backgroundColor, logoColor, topBarColor, sideBarColor]);

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  };

  const handleLogoColorChange = (color) => {
    setLogoColor(color);
  };

  const handleTopBarColorChange = (color) => {
    setTopBarColor(color);
  };

  const handleSideBarColorChange = (color) => {
    setSideBarColor(color);
  };

  return (
    <div className="custom-template">
      {/* <div className="title">Paramètres</div> */}
      <div className="custom-content">
        <div className="switcher">
          <div className="switch-block">
            <h4>Logo</h4>
            <div className="btnSwitch">
              <button type="button" className="changeLogoHeaderColor" data-color="dark" onClick={() => handleLogoColorChange('dark')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="blue" onClick={() => handleLogoColorChange('blue')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="purple" onClick={() => handleLogoColorChange('purple')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="light-blue" onClick={() => handleLogoColorChange('light-blue')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="green" onClick={() => handleLogoColorChange('green')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="orange" onClick={() => handleLogoColorChange('orange')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="red" onClick={() => handleLogoColorChange('red')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="white" onClick={() => handleLogoColorChange('white')}></button>
              <br />
              <button type="button" className="changeLogoHeaderColor" data-color="dark2" onClick={() => handleLogoColorChange('dark2')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="blue2" onClick={() => handleLogoColorChange('blue2')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="purple2" onClick={() => handleLogoColorChange('purple2')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="light-blue2" onClick={() => handleLogoColorChange('light-blue2')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="green2" onClick={() => handleLogoColorChange('green2')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="orange2" onClick={() => handleLogoColorChange('orange2')}></button>
              <button type="button" className="changeLogoHeaderColor" data-color="red2" onClick={() => handleLogoColorChange('red2')}></button>
            </div>
          </div>
          <div className="switch-block">
            <h4>Barre de navigation</h4>
            <div className="btnSwitch">

              <button type="button" className="changeTopBarColor" data-color="dark" onClick={() => handleTopBarColorChange('dark')}></button>
              <button type="button" className="changeTopBarColor" data-color="blue" onClick={() => handleTopBarColorChange('blue')}></button>
              <button type="button" className="changeTopBarColor" data-color="purple" onClick={() => handleTopBarColorChange('purple')}></button>
              <button type="button" className="changeTopBarColor" data-color="light-blue" onClick={() => handleTopBarColorChange('light-blue')}></button>
              <button type="button" className="changeTopBarColor" data-color="green" onClick={() => handleTopBarColorChange('green')}></button>
              <button type="button" className="changeTopBarColor" data-color="orange" onClick={() => handleTopBarColorChange('orange')}></button>
              <button type="button" className="changeTopBarColor" data-color="red" onClick={() => handleTopBarColorChange('red')}></button>
              <button type="button" className="changeTopBarColor" data-color="white" onClick={() => handleTopBarColorChange('white')}></button>
              <br />
              <button type="button" className="changeTopBarColor" data-color="dark2" onClick={() => handleTopBarColorChange('dark2')}></button>
              <button type="button" className="changeTopBarColor" data-color="blue2" onClick={() => handleTopBarColorChange('blue2')}></button>
              <button type="button" className="changeTopBarColor" data-color="purple2" onClick={() => handleTopBarColorChange('purple2')}></button>
              <button type="button" className="changeTopBarColor" data-color="light-blue2" onClick={() => handleTopBarColorChange('light-blue2')}></button>
              <button type="button" className="changeTopBarColor" data-color="green2" onClick={() => handleTopBarColorChange('green2')}></button>
              <button type="button" className="changeTopBarColor" data-color="orange2" onClick={() => handleTopBarColorChange('orange2')}></button>
              <button type="button" className="changeTopBarColor" data-color="red2" onClick={() => handleTopBarColorChange('red2')}></button>
            </div>
          </div>
          <div className="switch-block">
            <h4>Barre latérale</h4>
            <div className="btnSwitch">
              <button type="button" className="changeSideBarColor" data-color="white" onClick={() => handleSideBarColorChange('white')}></button>
              <button type="button" className="changeSideBarColor" data-color="dark"onClick={() => handleSideBarColorChange('dark')}></button>
              <button type="button"className="changeSideBarColor" data-color="dark2" onClick={() => handleSideBarColorChange('dark2')}></button>
            </div>
          </div>
          {/* <div className="switch-block">
            <h4>Arrière-plan</h4>
            <div className="btnSwitch">
              <button type="button" className="changeSideBarColor" data-color="bg2" onClick={() => handleBackgroundColorChange('bg2')}></button>
              <button type="button" className="changeSideBarColor" data-color="bg1" onClick={() => handleBackgroundColorChange('bg1')}></button>
              <button type="button" className="changeSideBarColor" data-color="bg3" onClick={() => handleBackgroundColorChange('bg3')}></button>
              <button type="button" className="changeSideBarColor" data-color="dark" onClick={() => handleBackgroundColorChange('dark')}></button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ColorSettings;
