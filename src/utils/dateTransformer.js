export function dateTransformer(dateArg) {
    const date = new Date(dateArg);
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getUTCFullYear();
    const formattedDate = `${day}. ${month} ${year}`;
    return formattedDate
}

export function transformMonth(month) {
    switch (month) {
      case 1:
        return 'Jan'
        break;
      case 2:
        return 'Feb'
        break;
      case 3:
        return 'Mar'
        break;
      case 4:
        return 'Apr'
        break;
      case 5:
        return 'May'
        break;
      case 6:
        return 'Jun'
        break;
      case 7:
        return 'Jul'
        break;
      case 8:
        return 'Aug'
        break;
      case 9:
        return 'Sep'
        break;
      case 10:
        return 'Okt'
        break;
      case 11:
        return 'Nov'
        break;
      case 12:
        return 'Dez'
        break;
    
      default:
        break;
    }
  }