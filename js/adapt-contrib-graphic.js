define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class GraphicView extends ComponentView {
      
          events () {
      return {
        'click .lens-icon': 'onImageClicked'
      }
    }

    preRender() {
      this.listenTo(Adapt, 'device:changed', this.resizeImage);

      this.checkIfResetOnRevisit();
    }

    postRender() {
      this.resizeImage(Adapt.device.screenSize, true);
    }

    checkIfResetOnRevisit() {
      const isResetOnRevisit = this.model.get('_isResetOnRevisit');

      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }

    resizeImage(width, setupInView) {
      const imageWidth = width === 'medium' ? 'small' : width;
      const imageSrc = (this.model.get('_graphic')) ? this.model.get('_graphic')[imageWidth] : '';
      this.$('.js-graphic-set-image-src').attr('src', imageSrc);

      this.$('.graphic__widget').imageready(() => {
        this.setReadyStatus();

        if (setupInView) {
          this.setupInviewCompletion('.graphic__widget');
        }
      });
    }
      onImageClicked (event) {
              this.openPopup();
    }
      
      
      
          openPopup() {
              const largeimage = this.model.get('_graphic')["large"];
              var popupObject = {
    body: "<img src='"+ largeimage +"'>",
    _classes: "imageviewer" + this.model.get('_classes')
};

Adapt.notify.popup(popupObject);// if using Adapt FW v4.4.0 or later (the above will still work but will be removed in a future release)
    }


  
      
      
  }

  GraphicView.template = 'graphic';

  return Adapt.register('graphic', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: GraphicView
  });

});
