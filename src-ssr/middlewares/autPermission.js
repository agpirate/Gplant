
const checkGroup = (group) => {
    return (req, res, next) => {
      if (req._issgroup.group !== group) {
        return res.status(403).send('Access Denied');
      }
      next();
    };
  };
  
const checkRole = (role) => {
    return (req, res, next) => {
      const userRole = req._issgroup.role;
      if (!userRole.includes(role)) {
        return res.status(403).send('Access Denied');
      }
      next();
    };
  };

  const checkCapability = (action) => {
    return (req, res, next) => {
      const userAction = req._issgroup.capability;
      if (action != userAction) {
        return res.status(403).send('Access Denied');
      }
      next();
    };
  };

  const checkAccstage = (stage) => {
    return (req, res, next) => {
      const userStage = req._issgroup.accstage;
      if (!userStage.includes(stage)) {
        return res.status(403).send('Access Denied');
      }
      next();
    };
  };
  export { checkGroup,checkRole,checkCapability,checkAccstage}