/**
 * BLOCK: cgb
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';


const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
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
registerBlockType( 'ww/button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'WW - Button', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		'WW - Button',
		'Webwerk',
	],
  attributes: {
            // Text of the link-button
            link_text: {
                type: 'string',
                source: 'text',
                selector: 'span',
            },
            // URL of the link-button
            link_url: {
                selector: 'a', // From tag a
                source: 'attribute', // binds an attribute of the tag
                attribute: 'href', // binds href of a: the link url
            },
            // URL of the link-button
            svg_url: {
                selector: 'use', // From tag use
                source: 'attribute', // binds an attribute of the tag
                attribute: 'href', // binds href of use: the svg url
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
	edit( {className, attributes, setAttributes} ) {

    var link_text = attributes.link_text;
    var link_url = attributes.link_url;
    var svg_url = attributes.svg_url;
    var template_url = ww_blocks.templateUrl;

    function onChangeLinkText ( content ) {
        setAttributes({link_text: content})
    }

    function onChangeLinkURL ( content ) {
        setAttributes({link_url: content})
    }

    setAttributes({svg_url: template_url + '/img/icons.svg#button-next'});

		return ([
        <InspectorControls>
          <PanelBody title="Link Parameter">
            <div id="ww-container-inspector-control-wrapper">
              <label class="blocks-base-control__label" for="mce_1">Link Text</label>
              <TextControl
                onChange={onChangeLinkText} // onChange event callback
                value={link_text} // Input Binding
                />
              <label class="blocks-base-control__label" for="mce_2">Link URL</label>
              <TextControl
                onChange={onChangeLinkURL} // onChange event callback
                value={link_url} // Input Binding
                />
            </div>
          </PanelBody>
        </InspectorControls>,
        <div className={ className }>
          <a class="wp-block-ww-button__link" href="#">
            <svg role="img" class="symbol" aria-hidden="true" focusable="false">
              <use href={svg_url}></use>
            </svg>
            <span>{link_text}</span>
          </a>
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
	save( { className, attributes } ) {

    var link_text = attributes.link_text;
    var link_url = attributes.link_url;
    var svg_url = attributes.svg_url;

		return (
      <div className={ className }>
        <a class="wp-block-ww-button__link" href={link_url}>
          <svg role="img" class="symbol" aria-hidden="true" focusable="false">
            <use href={svg_url}></use>
          </svg>
          <span>{link_text}</span>
        </a>
      </div>
		);
	},
} );
