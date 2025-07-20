import type ProductInterface from "./ProductInterface";

type TreeNode = Array<CategoryInterface> | Array<ProductInterface>;

export default interface CategoryInterface {
	name: string;
	children: TreeNode;
	isSelected?: boolean;
}
