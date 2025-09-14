import { MenuList } from "./MenuList";
import { SubMenuContent } from "./SubMenuContent";
import { CartContent } from "./CartContent";

export function ContentSwitcher({ content, menuData, currentSubmenu, onContentChange, onSubmenuSelect }) {
    const handleMenuClick = (menuItem) => {
        onSubmenuSelect(menuItem);
        onContentChange(`submenu-${menuItem.id}`);
    };

    switch (content) {
        case "links-main": 
            return (
                <MenuList menuItems={menuData?.mainNavigation} variant="mobile" onMenuClick={handleMenuClick} />
            );
        case "cart": 
            return <CartContent />;
        default:
            if (content.startsWith('submenu-')) {
                return (
                    <SubMenuContent submenu={currentSubmenu} onBack={() => onContentChange("links-main")} />
                );
            }
            return (
                <MenuList menuItems={menuData?.mainNavigation} variant="mobile" onMenuClick={handleMenuClick} />
            );
    }
}