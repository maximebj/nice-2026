import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save(props) {
	const { attributes } = props;
	const { content, type } = attributes;

	const blockProps = useBlockProps.save({ className: `is-type-${type}` });

	return (
		<div {...blockProps}>
			<RichText.Content tagName="p" value={content} />
		</div>
	);
}
