/**
 * BLOCK: Webwerk - Block Container
 *
 * Registering a basic block with Gutenberg.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
  InnerBlocks,
  InspectorControls,
  RichText
} = wp.editor;
const { PanelBody, TextControl } = wp.components;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ww/category-head', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'WW - Kategorie-Überschrift', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		 'WW - Kategorie-Überschrift',
		 'Webwerk',
	],
  attributes: {
            span_class: {
                type: 'string',
            },
            content: {
        			source: 'html',
        			selector: 'span',
        		},
},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit( {className, attributes, setAttributes}  ) {

    if (!span_class) {
      attributes.span_class = 'category-head';
    }

    var span_class = attributes.span_class;

    function onChangeSpanClass ( content ) {
      setAttributes({span_class: content})
    }



        return ([
          <InspectorControls>
            <PanelBody title="Klassenname">
              <div id="ww-container-inspector-control-wrapper">
                <label class="blocks-base-control__label" for="mce_1">Span Klasse</label>
                <TextControl
                  onChange={onChangeSpanClass} // onChange event callback
                  value={span_class} // Input Binding
                  />
              </div>
            </PanelBody>
          </InspectorControls>,
          <div className={ className }>
            <RichText
              tagName="span"
              className={ span_class }
              value={ attributes.content }
              onChange={ ( content ) => setAttributes( { content } ) }
            />
          </div>
        ]);

	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save( { attributes } ) {

    return <RichText.Content tagName="span" value={ attributes.content } className={attributes.span_class} />;

}
} );
