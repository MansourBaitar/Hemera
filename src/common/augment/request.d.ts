declare namespace Express {
    export interface Request {
      /**
       * Parsed value of a the bearer token
       */
      token?: any;
  
      /**
       * If authorization request has been sent, middleware will
       * check what scopes are allowed for the certain consumer.
       */
      allowedScopes?: string[];
  
      /**
       * If the consumer requested scopes that were not allowed
       * this property will have the value of `true`.
       */
      scopesAltered?: boolean;
  
      /**
       * Value will be true if user allready consented to application
       * and the scopes match with the consented entity
       */
      scopesMatchConsent?: boolean;
  
      /**
       * The valid and authorized consumer that requested authrozation.
       */
      // consumer?: import('src/consumer/consumer.entity').Consumer;
  
      /**
       * The authenticated user object. Only available on the OAuth routes.
       */
      // user?: import('src/user/user.entity').User;
  
      /**
       * If the user has already given consent to the application this
       * property will have the value of the exact consent value.
       */
      //  consent?: import('src/consent/consent.entity').Consent;
    }
  }
  