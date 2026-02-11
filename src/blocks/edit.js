import {
	BlockControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import "./editor.scss";

const options = [
	{
		type: "advice",
		label: __("Advice", "capitainewp-blocks"),
		icon: "yes-alt",
	},
	{
		type: "warning",
		label: __("Warning", "capitainewp-blocks"),
		icon: "warning",
	},
	{
		type: "avoid",
		label: __("Avoid", "capitainewp-blocks"),
		icon: "dismiss",
	},
	{
		type: "info",
		label: __("Information", "capitainewp-blocks"),
		icon: "info",
	},
];

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { content, type } = attributes;

	const blockProps = useBlockProps({ className: `is-type-${type}` });

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{options.map((option) => (
						<ToolbarButton
							key={option.type}
							icon={option.icon}
							label={option.label}
							className={`capitainewp-toolbar-${option.type}`}
							onClick={() => setAttributes({ type: option.type })}
							isPressed={type === option.type}
						/>
					))}
				</ToolbarGroup>
			</BlockControls>

			<div {...blockProps}>
				<RichText
					tagName="p"
					placeholder={__("Your alert here", "capitainewp-blocks")}
					value={content}
					onChange={(content) => setAttributes({ content })}
				/>
			</div>
		</>
	);
}
