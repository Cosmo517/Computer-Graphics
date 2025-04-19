function CreateSun() {
    let mySun = [];
    const width = 16;
    const height = 16;
    for (let y = height; y > 0; y--) {
        for (let x = 0; x < width; x++) {
            mySun.push(255, 255, 0, 255);
        }
    }

    return mySun;
}

function CreateFloor() {
    let myFloor = [];
    const width = 64;
    const height = 64;
    for (let y = height; y > 0; y--) {
        for (let x = 0; x < width; x++) {
            const color = FloorType[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myFloor.push(r, g, b, 255);
        }
    }

    return myFloor;
}

function CreateWallType() {
    let myWall = [];
    const width = 64;
    const height = 64;
    for (let y = height; y > 0; y--) {
        for (let x = 0; x < width; x++) {
            const color = WallType[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myWall.push(r, g, b, a);
        }
    }

    return myWall;
}

function CreateLightType() {
    let myLight = [];
    const width = 64;
    const height = 64;
    for (let y = height; y > 0; y--) {
        for (let x = 0; x < width; x++) {
            const color = LightType[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myLight.push(r, g, b, a);
        }
    }

    return myLight;
}

function CreatePlayButton() {
    let myButton = [];
    const width = 420;
    const height = 83;
    for (let y = height ; y > 0; y--) {
        for (let x = 0; x < width; x++) {
            const color = PlayButtonType[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myButton.push(r, g, b, a);
        }
    }

    return myButton;
}

function CreateMageType(mageArray) {
    let myMage = [];
    const width = 64;
    const height = 64;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = mageArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myMage.push(r, g, b, a);
        }
    }

    return myMage;
}

function CreateNecromancerType(necromancerArray) {
    let myNecromancer = [];
    const width = 160;
    const height = 128;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = necromancerArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myNecromancer.push(r, g, b, a);
        }
    }

    return myNecromancer;
}

function CreateWarriorType(warriorArray) {
    let myWarrior = [];
    const width = 80;
    const height = 80;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = warriorArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myWarrior.push(r, g, b, a);
        }
    }

    return myWarrior;
}

function CreateFireExplosion(fireArray) {
    let myExplosion = [];
    const width = 32;
    const height = 32;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = fireArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myExplosion.push(r, g, b, a);
        }
    }

    return myExplosion;    
}

function CreateFireBullet(fireBullet) {
    let myBullet = [];
    const width = 16;
    const height = 16;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = fireBullet[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myBullet.push(r, g, b, a);
        }
    }

    return myBullet;
}

function CreateChestType(chestArray) {
    let myChest = [];
    const width = 48;
    const height = 32;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = chestArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myChest.push(r, g, b, a);
        }
    }

    return myChest;
}

function CreateStaffSprite(staffArray) {
    let myStaff = [];
    const width = 26;
    const height = 43;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = staffArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myStaff.push(r, g, b, a);
        }
    }

    return myStaff;
}

function CreateEasyButton(easyArray) {
    let myButton = [];
    const width = 64;
    const height = 64;
    for (let y = height ; y > 0; y--) {
        for (let x = 0; x < width; x++) {
            const color = easyArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myButton.push(r, g, b, a);
        }
    }

    return myButton;
}

function CreateNormalButton(normalArray) {
    let myButton = [];
    const width = 64;
    const height = 64;
    for (let y = height ; y > 0; y--) {
        for (let x = 0; x < width; x++) {
            const color = normalArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myButton.push(r, g, b, a);
        }
    }

    return myButton;
}

function CreateHardButton(hardArray) {
    let myButton = [];
    const width = 64;
    const height = 64;
    for (let y = height ; y > 0; y--) {
        for (let x = 0; x < width; x++) {
            const color = hardArray[y * width + x];

            // Extract RGBA components from the 32-bit color value
            const r = (color >> 24) & 0xFF;
            const g = (color >> 16) & 0xFF;
            const b = (color >> 8) & 0xFF;
            const a = color & 0xFF;

            myButton.push(r, g, b, a);
        }
    }

    return myButton;
}


function CreateCrate() {
    // This is purely used as a backup sprite for the quad
    var myCrate = [];
    for (i = 0; i < 64; i ++) {
        for (j = 0; j < 64; j++) {
            if (i == 0 || j == 0 || i == 63 || j == 63 || i == j || 64 - j == i) {
                myCrate.push(0, 0, 0, 255);
            } else {
                myCrate.push(200, 128, 23, 255);
            }
        }
    }

    return myCrate;
}

