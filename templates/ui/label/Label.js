import Sizer from '../sizer/Sizer.js';
import DefaultMask from 'rexPlugins/utils/mask/DefaultMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Label extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexLabel';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var icon = GetValue(config, 'icon', undefined);
        var iconMask = GetValue(config, 'iconMask', undefined);
        var text = GetValue(config, 'text', undefined);
        var action = GetValue(config, 'action', undefined);
        var actionMask = GetValue(config, 'actionMask', undefined);
        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var iconSpace = GetValue(config, 'space.icon', 0);
        var textSpace = GetValue(config, 'space.text', 0);

        if (background) {
            this.addBackground(background);
        }

        if (icon) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: paddingLeft,
                    right: (text || action) ? iconSpace : paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: (text || action) ? iconSpace : paddingBottom
                }
            }

            this.add(icon, 0, 'center', padding);

            if (iconMask) {
                iconMask = new DefaultMask(icon, 1); // Circle mask
                icon.setMask(iconMask.createGeometryMask());
                this.add(iconMask, null);
            }
        }

        if (text) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: (icon) ? 0 : paddingLeft,
                    right: (action) ? textSpace : paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (icon) ? 0 : paddingTop,
                    bottom: (action) ? textSpace : paddingBottom
                }
            }
            this.add(text, 0, 'center', padding);
        }

        if (action) {
            var padding;
            if (this.orientation === 0) {
                padding = {
                    left: (icon || text) ? 0 : paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (icon || text) ? 0 : paddingTop,
                    bottom: paddingBottom
                }
            }
            this.add(action, 0, 'center', padding);

            if (actionMask) {
                actionMask = new DefaultMask(action, 1); // Circle mask
                icon.setMask(actionMask.createGeometryMask());
                this.add(actionMask, null);
            }
        }

        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.icon = icon;
        this.childrenMap.iconMask = iconMask;
        this.childrenMap.text = text;
        this.childrenMap.action = action;
        this.childrenMap.actionMask = actionMask;
    }

    get text() {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return '';
        }
        var value;
        if (textObject.text) {
            value = textObject.text;
        } else {
            value = textObject.getData('text');
        }
        return value;
    }

    set text(value) {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return;
        }
        if (textObject.setText) {
            textObject.setText(value);
        } else {
            textObject.setData('text', value);
        }
    }

    setText(value) {
        this.text = value;
        return this;
    }

    appendText(value) {
        this.text += value;
    }

    layout(parent) {
        super.layout(parent);
        // Pin icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.setPosition();
            this.resetChildState(iconMask);
        }
        // Pin action-mask to action game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.setPosition();
            this.resetChildState(actionMask);
        }
        return this;
    }

    resize(width, height) {
        super.resize(width, height);
        // Resize icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
            iconMask.resize();
        }
        // Resize action-mask to icon game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
            actionMask.resize();
        }
        return this;
    }
}

export default Label;